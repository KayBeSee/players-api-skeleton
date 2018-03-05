var bcrypt = require('bcrypt');

var UserModel = require('../models/user');

function saltPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

class UserApi {
  async createUser(first_name, last_name, email, password) {
    let user = await UserModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: saltPassword(password)
    });
    return user;
  }

  async updateUser(updatedUser) {
    let user = await UserModel.findOneAndUpdate({email: updatedUser.email }, updatedUser, {new: true});
    return user;
  }

  async loginUser(email, password) {
    let user = await UserModel.findOne({ email: email.toLowerCase()});
    if (!user) throw new Error('User not found');
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error('Password is incorrect');
    return user;
  }
}

module.exports = UserApi;
