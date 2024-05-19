import { Location } from "./location.js";
import { Review } from "./review.js";


export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
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

    // function to add a location image
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

    async addReviewToLocation(locationId, reviewId) {
      // Find the location by its ID
      const location = await Location.findById(locationId);

      if (!location) {
        throw new Error(`Location with id ${locationId} not found`);
      }

      // Add the review ID to the location & save
      location.reviews = reviewId;
      await location.save();
    },
    

    async getAllPublicLocations() {
      // get all locations that have the value of true for public_location
      const publicLocations = await Location.find({ public_location: true })
        // populate user who added the public location
        .populate("userid", "firstName lastName")
        // populate reviews and the user who added the review
        .populate({
          path: "reviews",
          populate: { path: "userid", select: "firstName lastName" }
        })
        .lean();
      return publicLocations;
    },

    async addNewReview(review) {
      try {
        const newReview = new Review(review);
        await newReview.save();
        return newReview;
      } catch (err) {
        console.error("Error adding review", err);
        return null;
      }
    },
}