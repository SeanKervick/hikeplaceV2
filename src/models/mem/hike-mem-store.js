import { v4 } from "uuid";

let hikes = [];

export const hikeMemStore = {
  async getAllHikes() {
    return hikes;
  },

  async addHike(locationId, hike) {
    hike._id = v4();
    hike.locationid = locationId;
    hikes.push(hike);
    return hike;
  },

  async getHikesByLocationId(id) {
    return hikes.filter((hike) => hike.locationid === id);
  },

  async getHikeById(id) {
    let foundHike = hikes.find((hike) => hike._id === id);
    if (!foundHike) {
      foundHike = null;
    }
    return foundHike;
  },

  async getLocationHikes(locationId) {
    let foundHikes = hikes.filter((hike) => hike.locationid === locationId);
    if (!foundHikes) {
      foundHikes = null;
    }
    return foundHikes;
  },

  async deleteHike(id) {
    const index = hikes.findIndex((hike) => hike._id === id);
    if (index !== -1) hikes.splice(index, 1);
  },

  async deleteAllHikes() {
    hikes = [];
  },

  async updateHike(hike, updatedHike) {
    hike.hikeName = updatedHike.hikeName;
    hike.description = updatedHike.description;
    hike.difficulty = updatedHike.difficulty;
    hike.length = updatedHike.length;
    hike.elevation = updatedHike.elevation;
  },
};

