var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Model: USER
 * 
 * username, password: thông tin đăng nhập dành cho phòng/khoa
 * googleId: thông tin xác thực của google dành cho sinh viên
 * roleId: id phân quyền cho user
 * 
 * studentId: MSSV
 * displayName: tên hiển thị
 * class: lớp học
 * major: ngành học
 * departmentId: phòng/khoa mà user phụ trách (1 user có thể phụ trách nhiều phòng/khoa)
 * imageUrl: đường dẫn tới ảnh đại diện của user
 */
module.exports = mongoose.model('User', new Schema({
  username: {
    type: String, 
    unique: true
  },
  password: String,
  googleId: String,
  roleId: Number,
  studentId: String,
  displayName: String,
  class: String,
  major: String,
  imageUrl: String,
  departmentId: [Number]
}, {timestamps: true}));