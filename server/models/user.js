var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  googleId: String,
  displayName: String,
  class: String,
  major: String,
  picture: String,
  role: Object
});

module.exports = mongoose.model('User', UserSchema);