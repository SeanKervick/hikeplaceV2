import { db } from "../models/db.js";


export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      // const locations = await db.locationStore.getAllLocations();
      const viewData = {
        title: "hikeplace dashboard",
        users: users,
        // locations: locations,
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin");
    },
  },

  deleteAllUsers: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      await db.userStore.deleteAll(users);
      return h.redirect("/admin");
    },
  },

};