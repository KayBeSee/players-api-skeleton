const mongoose = require('mongoose');

let PlayerSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  rating: { type: String, required: true },
  handedness: { type: String, required: true, enum: ['left', 'right'] },
  created_by: { type: String } // NOTE: Not in documentation
});

// PlayerSchema.index({first_name: 1, last_name: 1}, {unique: true});

// Duplicate the ID field.
PlayerSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
PlayerSchema.set('toJSON', {
  virtuals: true
});

PlayerSchema.set('toObject', {
  virtuals: true
});

let PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports = PlayerModel;
