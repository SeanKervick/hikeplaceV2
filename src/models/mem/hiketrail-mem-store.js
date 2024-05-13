import { v4 } from "uuid";

let hiketrails = [];

export const hiketrailMemStore = {
  async getAllHiketrails() {
    return hiketrails;
  },

  async addHiketrail(hiketrail) {
    hiketrail._id = v4();
    hiketrails.push(hiketrail);
    return hiketrail;
  },

  async deleteHiketrailById(id) {
    const index = hiketrails.findIndex((hiketrail) => hiketrail._id === id);
    hiketrails.splice(index, 1);
  },

  async deleteAllHiketrails() {
    hiketrails = [];
  },

  async getUserHiketrails(userid) {
    return hiketrails.filter((hiketrail) => hiketrail.userid === userid);
  },
};