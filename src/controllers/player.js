const PlayerModel = require('../models/player');
var ObjectId = require('mongoose').Types.ObjectId;

class PlayerApi {
  async getAll(user) {
    return await new Promise(async (resolve, reject) => {
      try {
        let players = await PlayerModel.find({created_by: user.id});
        resolve(players);
      } catch (err) {
        reject(err)
      }
    });
  }

  async createPlayer(first_name, last_name, rating, handedness) {
    return await new Promise(async (resolve, reject) => {
      try {
        let player = await PlayerModel.create({ first_name, last_name, rating, handedness });
        resolve(player);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deletePlayer(id, user) {
    return await new Promise(async (resolve, reject) => {
      try {
        let player = await PlayerModel.findOne({_id: ObjectId(id)});
        if (!player) return reject('Player not found');
        if (player.created_by !== user.id) return reject('User did not create player');
        PlayerModel.remove({_id: ObjectId(id)}, (err, res) => {
          resolve(err);
        });
      } catch (err) {
        reject(false);
      }
    });
  }
}

module.exports = PlayerApi;
