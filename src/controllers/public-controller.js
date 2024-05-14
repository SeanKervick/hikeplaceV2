import { db } from "../models/db.js";


export const publicController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      const publicLocations = await db.locationStore.getAllPublicLocations();
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "public dashboard",
        publicLocations: publicLocations,
        user: loggedInUser,
      };
      return h.view("public-dashboard-view", viewData);
    },
  },
};