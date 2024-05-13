import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testHikes, kerry, waterford, mahonFalls, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Hike Model tests", () => {

  let kerryList = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.hikeStore.deleteAllHikes();
    kerryList = await db.locationStore.addLocation(kerry);
    for (let i = 0; i < testHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testHikes[i] = await db.hikeStore.addHike(kerryList._id, testHikes[i]);
    }
  });

  test("create single hike", async () => {
    const waterfordList = await db.locationStore.addLocation(waterford);
    const hike = await db.hikeStore.addHike(waterfordList._id, mahonFalls)
    assert.isNotNull(hike._id);
    assertSubset (mahonFalls, hike);
  });

  test("get multiple hikes", async () => {
    const hikes = await db.hikeStore.getHikesByLocationId(kerryList._id);
    assert.equal(hikes.length, testHikes.length)
  });

  test("delete all hikes", async () => {
    const hikes = await db.hikeStore.getAllHikes();
    assert.equal(testHikes.length, hikes.length);
    await db.hikeStore.deleteAllHikes();
    const newHikes = await db.hikeStore.getAllHikes();
    assert.equal(0, newHikes.length);
  });

  test("get a hike - success", async () => {
    const waterfordList = await db.locationStore.addLocation(waterford);
    const hike = await db.hikeStore.addHike(waterfordList._id, mahonFalls)
    const newHike = await db.hikeStore.getHikeById(hike._id);
    assertSubset (mahonFalls, newHike);
  });

  test("delete One Hike - success", async () => {
    await db.hikeStore.deleteHike(testHikes[0]._id);
    const hikes = await db.hikeStore.getAllHikes();
    assert.equal(hikes.length, testLocations.length - 1);
    const deletedHike = await db.hikeStore.getHikeById(testHikes[0]._id);
    assert.isNull(deletedHike);
  });

  test("get a hike - bad params", async () => {
    assert.isNull(await db.hikeStore.getHikeById(""));
    assert.isNull(await db.hikeStore.getHikeById());
  });

  test("delete one hike - fail", async () => {
    await db.hikeStore.deleteHike("bad-id");
    const hikes = await db.hikeStore.getAllHikes();
    assert.equal(hikes.length, testLocations.length);
  });
});