const userRoutes =require('./user');
const playerRoutes =require('./player');

module.exports = (server) => {
  userRoutes(server),
  playerRoutes(server)
};
