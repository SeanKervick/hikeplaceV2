import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";



export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getUserLocations(loggedInUser._id);
      const viewData = {
        title: "hikeplace dashboard",
        user: loggedInUser,
        locations: locations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "add location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newLocation = {
        userid: loggedInUser._id,
        title: request.payload.title,
        description: request.payload.description,
        longitude: request.payload.longitude,
        latitude: request.payload.latitude,
        distance: request.payload.distance,
        difficulty: request.payload.difficulty,
      };
      await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        console.log("image trying");
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          console.log("image 'if' trying");
          const url = await imageStore.uploadImage(request.payload.imagefile);
          location.img = url;
          await db.locationStore.updateLocationImage(location._id, url);
          console.log("image uploaded");
        }
        return h.redirect("/dashboard");
      } catch (err) {
        console.log("image trying error");
        console.log(err);
        // eslint-disable-next-line no-restricted-globals
        return h.redirect("/dashboard");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },
};