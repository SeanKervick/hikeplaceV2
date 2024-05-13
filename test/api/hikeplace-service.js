import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const hikeplaceService = {
  hikeplaceUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.hikeplaceUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.hikeplaceUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.hikeplaceUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.hikeplaceUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.hikeplaceUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.hikeplaceUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.hikeplaceUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.hikeplaceUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.hikeplaceUrl}/api/locations/${id}`);
    return res.data;
  },

  async getAllHikes() {
    const res = await axios.get(`${this.hikeplaceUrl}/api/hikes`);
    return res.data;
  },

  async createHike(id, hike) {
    const res = await axios.post(`${this.hikeplaceUrl}/api/locations/${id}/hikes`, hike);
    return res.data;
  },

  async deleteAllHikes() {
    const res = await axios.delete(`${this.hikeplaceUrl}/api/hikes`);
    return res.data;
  },

  async getHike(id) {
    const res = await axios.get(`${this.hikeplaceUrl}/api/hikes/${id}`);
    return res.data;
  },

  async deleteHike(id) {
    const res = await axios.delete(`${this.hikeplaceUrl}/api/hikes/${id}`);
    return res.data;
  },
};