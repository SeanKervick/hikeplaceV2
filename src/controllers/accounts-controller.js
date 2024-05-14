import dotenv from "dotenv";
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec, } from "../models/joi-schemas.js";

let loggedIn = false; // variable to control menu options

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "welcome to hikeplace" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "sign up for hikeplace" });
    },
  },
  showAdmin: {
    auth: false,
    handler: function (request, h) {
      return h.view("admin-view", { title: "admin for hikeplace" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "login to hikeplace" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {

      const { email, password } = request.payload;

      if (email === process.env.adminEmail && password === process.env.adminPassword) {
        request.cookieAuth.set({ id: "admin" });
        console.log("logging in: admin");
        return h.redirect("/admin");
      }
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        console.log("no match");
        loggedIn = false; // variable to control menu options
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      loggedIn = true; // variable to control menu options
      console.log("user logged in");
      console.log("loggedIn = ", loggedIn);
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      loggedIn = false; // variable to control menu options
      console.log("loggedIn = ", loggedIn);
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    if (session.id === "admin") {
      return { isValid: true, credentials: { id: "admin" } };
    }

    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    loggedIn = true; // variable to control menu options
    return {isValid: true, credentials: user };
  },
};