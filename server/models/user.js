var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // Thông tin xác thực tổng quát của sinh viên cũng như
  // phòng/khoa và admin
  userId: {
    type: String, 
    unique: true
  },
  googleId: String,
  password: String,
  roleId: Number,

  // Thông tin sinh viên
  studentId: String,
  displayName: String,
  class: String,
  major: String,
  picture: String,
});

module.exports = mongoose.model('User', UserSchema);