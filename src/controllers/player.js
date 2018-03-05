const PlayerModel = require('../models/player');
var ObjectId = require('mongoose').Types.ObjectId;

class PlayerApi {
  async getAll(user) {
    let players = await PlayerModel.find({created_by: user.id});
    return players;
  }

  async createPlayer(first_name, last_name, rating, handedness, user) {
    let player = await PlayerModel.create({ first_name, last_name, rating, handedness, created_by: user.id });
    return player;
  }

  async deletePlayer(id, user) {
    let player = await PlayerModel.findOne({_id: ObjectId(id)});
    if (!player) throw new Error('Player not found');
    if (player.created_by !== user.id) throw new Error('User did not create player');
    await PlayerModel.remove({_id: ObjectId(id)});
  }
}

module.exports = PlayerApi;
