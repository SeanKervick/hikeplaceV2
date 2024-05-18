import dotenv from "dotenv";
import bcrypt from "bcrypt";
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
      try {
        console.log("Handler Trying");
        const user = request.payload;
        console.log(user);

        const saltRounds = 10;

        // Generate salt
        const salt = await bcrypt.genSalt(saltRounds);
        console.log("Salt generation successful");

        // Hash the password
        const hash = await bcrypt.hash(user.password, salt);
        console.log("Hashed password:", hash);

        // Save the user with the hashed password
        user.password = hash;
        await db.userStore.addUser(user);

        return h.redirect("/");
      } catch (err) {
        console.error(err);
        return h.response({ error: "An error occurred" }).code(500);
      }
    }
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
      if (!user) {
        console.log("User not found");
        loggedIn = false; // variable to control menu options
        return h.redirect("/");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Password mismatch");
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