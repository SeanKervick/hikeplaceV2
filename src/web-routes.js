import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { publicController } from "./controllers/public-controller.js";
import { reviewController } from "./controllers/review-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },

  { method: "GET", path: "/public", config: publicController.index },
  { method: "GET", path: "/public/not-logged-in", config: publicController.other },

  { method: "POST", path: "/review/add/{id}", config: reviewController.addReview },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard/deletelocation/{id}", config: dashboardController.deleteLocation },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/admin/deleteallusers", config: adminController.deleteAllUsers },
  { method: "GET", path: "/admin/deletealllocations", config: adminController.deleteAllLocations },

  { method: "POST", path: "/dashboard/uploadimage/{id}", config: dashboardController.uploadImage },
  
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

];