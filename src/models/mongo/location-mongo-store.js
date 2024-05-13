import { Location } from "./location.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      if (location) {
        // location.hikes = await hikeMongoStore.getHikesByLocationId(location._id);
      }
      return location;
    }
    return null;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getUserLocations(id) {
    const location = await Location.find({ userid: id }).lean();
    return location;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  // async updateLocation(updatedLocation) {
  //   const location = await Location.findOne({ _id: updatedLocation._id });
  //   location.title = updatedLocation.title;
  //   location.img = updatedLocation.img;
  //   await location.save();
  // },

    // function to update a location image
    async updateLocationImage(locationId, imageUrl) {
      // find the location by ID
      const location = await Location.findById(locationId);
      // check if the location exists
      if (!location) {
        throw new Error("location not found");
      }
      // update the img field with the new image URL
      location.img = imageUrl;
      // save the updated location
      const updatedLocation = await location.save();
      return updatedLocation;
    },
  
};