import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testLocations, waterford } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Location Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await db.locationStore.addLocation(waterford);
    // assert.equal(waterford, location);
    assertSubset(waterford, location)
    assert.isDefined(location._id);
    EventEmitter.setMaxListeners(25);
  });

  test("delete all locations", async () => {
    let returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(waterford);
    const returnedLocation = await db.locationStore.getLocationById(location._id);
    // assert.equal(waterford, location);
    assertSubset(waterford, location)
  });

  test("delete One Location - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });
});