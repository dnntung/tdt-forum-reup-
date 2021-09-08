var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  roleId: {
    type: Number, 
    unique: true
  },
  description: String
});

module.exports = mongoose.model('Role', RoleSchema);