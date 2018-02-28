const jwt = require('jsonwebtoken')

const userController = require('../controllers/user');
let UserController = new userController();

const secret = 'alchemy-codes';

function getToken(user) {
  let { id, first_name, last_name, email } = user;
  let token = jwt.sign({ id, first_name, last_name, email }, secret); // password is salted, so this is fine
  return token;
}

module.exports = (server) => {
  server.post('/api/user', async (req, res) => {
    let { first_name, last_name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res.sendStatus(409);
    }
    try {
      let user = await UserController.createUser(first_name, last_name, email, password);
      let token = getToken(user);
      let success = true;
      res.status(201).send({success, user, token});
    } catch (err) {
      res.sendStatus(409);
    }
  });

  server.put('/api/user/:id', async (req, res) => {
    let { updatedUser } = req.body;
    try {
      let user = await UserController.updateUser(req.body);
      let token = getToken(user);
      let success = true;
      // NOTE: Sending back a 204 (expected from tests) won't return data to check against
      // res.status(204).send({success, user, token});
      res.status(200).send({success, user, token});
    } catch (err) {
      res.sendStatus(401);
    }
  });

  server.post('/api/login', async (req, res) => {
    let { email, password } = req.body;
    try {
      let user = await UserController.loginUser(email, password);
      let token = getToken(user);
      let success = true;
      res.status(200).send({success, user, token});
    } catch (err) {
      res.sendStatus(401);
    }
  });
};
