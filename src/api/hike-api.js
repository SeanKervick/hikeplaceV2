import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const hikeApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hikes = await db.hikeStore.getAllHikes();
        return hikes;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const hike = await db.hikeStore.getHikeById(request.params.id);
        if (!hike) {
          return Boom.notFound("No hike with this id");
        }
        return hike;
      } catch (err) {
        return Boom.serverUnavailable("No hike with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hike = await db.hikeStore.addHike(request.params.id, request.payload);
        if (hike) {
          return h.response(hike).code(201);
        }
        return Boom.badImplementation("error creating hike");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.hikeStore.deleteAllHikes();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hike = await db.hikeStore.getHikeById(request.params.id);
        if (!hike) {
          return Boom.notFound("No Hike with this id");
        }
        await db.hikeStore.deleteHike(hike._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Hike with this id");
      }
    },
  },
};