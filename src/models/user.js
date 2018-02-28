const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Duplicate the ID field.
UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true
});

UserSchema.set('toObject', {
  virtuals: true
});

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
