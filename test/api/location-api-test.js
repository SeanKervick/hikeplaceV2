import { EventEmitter } from "events";
import { assert } from "chai";
import { hikeplaceService } from "./hikeplace-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, waterford, testLocations } from "../fixtures.js";


EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {

  let user = null;

  setup(async () => {
    await hikeplaceService.deleteAllLocations();
    await hikeplaceService.deleteAllUsers();
    user = await hikeplaceService.createUser(maggie);
    waterford.userid = user._id;
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await hikeplaceService.createLocation(waterford);
    assert.isNotNull(returnedLocation);
    assertSubset(waterford, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await hikeplaceService.createLocation(waterford);
    const response = await hikeplaceService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await hikeplaceService.getLocation(waterford.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await hikeplaceService.createLocation(testLocations[i]);
    }
    let returnedLists = await hikeplaceService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await hikeplaceService.deleteAllLocations();
    returnedLists = await hikeplaceService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
      const response = await hikeplaceService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});