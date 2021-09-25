const Router = require('express').Router()


/**
 * GET /user - All users
 * 
 * @query q - Tìm toàn bộ user có tên chứa từ khóa tương ứng
 */
Router.get('/')

/**
 * GET /user - A user
 * 
 * @param userId - id của user cần lấy
 */
Router.get('/:userId')

/**
 * POST /user - Create a user
 * Admin có quyền tạo tài khoản cho phòng/khoa, cũng như cấp quyền cho phòng/khoa đăng bài cho 1 hoặc nhiều chuyên mục
 * 
 * @body username - Tên đăng nhập 
 * @body password - mật khẩu đăng nhập
 * @body departmentId - id của các phòng/khoa mà user sẽ phụ trách
 */
Router.post('/')

/**
 * PUT /user/:userId - Change account's info
 * Đối với account sinh viên: có thể thay đổi
 *  - Tên đại diện
 *  - Lớp
 *  - Khoa
 *  - Ảnh đại diện
 * Đối với account phòng/khoa: có thể thay đổi
 *  - Password mặc định do admin cấp lúc đầu
 * 
 * @param userId - id của user cần thay đổi
 * @body oldPassword - mật khẩu cũ
 * @body password - mật khẩu mới
 * @body passwordConfirm - xác nhận mật khẩu mới
 * 
 * @body displayName - tên hiển thị
 * @body class - lớp
 * @body major - khoa
 * @files image - ảnh đại diện
 */
Router.put('/:userId')

/**
 * DELETE /user/:userId - A user
 * Sau khi xóa user, các bình luận, bài viết liên quan đến user cũng sẽ được xóa. Tuy nhiên các thông báo có thể giữ lại (vì có thể có nhiều user phụ trách chung 1 phòng/khoa)
 * 
 * @param userId - id của user cần xóa
 */
Router.delete('/:userId')



module.export = Router