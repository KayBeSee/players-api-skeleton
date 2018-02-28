var bcrypt = require('bcrypt');

var UserModel = require('../models/user');

function saltPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

class UserApi {
  async createUser(first_name, last_name, email, password) {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await UserModel.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: saltPassword(password)
        });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateUser(updatedUser) {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await UserModel.findOneAndUpdate({email: updatedUser.email }, updatedUser, {new: true});
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async loginUser(email, password) {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) return reject(null);
        bcrypt.compare(password, user.password, (err, success) => {
          if (err) return reject(err);
          if (!success) return reject(new Error('Wrong Password'));
          return resolve(user);
        });
      } catch (err) {
        reject(new Error(err));
      }
    });
  }
}

module.exports = UserApi;
