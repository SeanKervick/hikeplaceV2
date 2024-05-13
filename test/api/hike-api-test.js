import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { hikeplaceService } from "./hikeplace-service.js";
import { maggie, waterford, testLocations, testHikes, mahonFalls } from "../fixtures.js";

suite("Hike API tests", () => {
  let user = null;
  let cork = null;

  setup(async () => {
    await hikeplaceService.deleteAllLocations();
    await hikeplaceService.deleteAllUsers();
    await hikeplaceService.deleteAllHikes();
    user = await hikeplaceService.createUser(maggie);
    waterford.userid = user._id;
    cork = await hikeplaceService.createLocation(waterford);
  });

  teardown(async () => {});

  test("create hike", async () => {
    const returnedHike = await hikeplaceService.createHike(cork._id, mahonFalls);
    assertSubset(mahonFalls, returnedHike);
  });

  test("create Multiple hikes", async () => {
    for (let i = 0; i < testHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikeplaceService.createHike(cork._id, testHikes[i]);
    }
    const returnedHikes = await hikeplaceService.getAllHikes();
    assert.equal(returnedHikes.length, testHikes.length);
    for (let i = 0; i < returnedHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hike = await hikeplaceService.getHike(returnedHikes[i]._id);
      assertSubset(hike, returnedHikes[i]);
    }
  });

  test("Delete HikeApi", async () => {
    for (let i = 0; i < testHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikeplaceService.createHike(cork._id, testHikes[i]);
    }
    let returnedHikes = await hikeplaceService.getAllHikes();
    assert.equal(returnedHikes.length, testHikes.length);
    for (let i = 0; i < returnedHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hike = await hikeplaceService.deleteHike(returnedHikes[i]._id);
    }
    returnedHikes = await hikeplaceService.getAllHikes();
    assert.equal(returnedHikes.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testHikes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikeplaceService.createHike(cork._id, testHikes[i]);
    }
    const returnedLocation = await hikeplaceService.getLocation(cork._id);
    assert.equal(returnedLocation.hikes.length, testHikes.length);
    for (let i = 0; i < testHikes.length; i += 1) {
      assertSubset(testHikes[i], returnedLocation.hikes[i]);
    }
  });
});