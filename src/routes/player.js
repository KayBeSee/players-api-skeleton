const jwt =require('jsonwebtoken');

const playerController = require('../controllers/player');
let PlayerController = new playerController();

module.exports = (server) => {
  server.get('/api/players', async (req, res) => {
    if (!req.headers.authorization) return res.status(403).send({success: false});
    try {
      let user = jwt.decode(req.headers.authorization.slice(7));
      let players = await PlayerController.getAll(user);
      let success = true;
      res.status(200).send({success, players});
    } catch (err) {
      res.sendStatus(409);
    }
  });

  server.post('/api/players', async (req, res) => {
    if (!req.headers.authorization) return res.status(403).send({success: false});
    let { first_name, last_name, rating, handedness } = req.body;
    try {
      let newPlayer = await PlayerController.createPlayer(first_name, last_name, rating, handedness);
      let success = true;
      res.status(201).send({success, player: newPlayer});
    } catch (err) {
      res.sendStatus(409);
    }
  });

  server.delete('/api/players/:id', async (req, res) => {
    if (!req.headers.authorization) return res.status(403).send({success: false});
    let { id } = req.params;
    try {
      let user = jwt.decode(req.headers.authorization.slice(7));
      await PlayerController.deletePlayer(id, user);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(404);
    }

  });
};
