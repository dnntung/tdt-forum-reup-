# TASKs

## Tài khoản

- [x] Đăng nhập bằng email sinh viên (sử dụng Google Authentication) 
- [ ] Đăng nhập bằng tài khoản phòng/khoa_admin 
- [x] Xác thực tokens sử dụng jwt (
	- [x] Xác thực access token
	- [x] Cung cấp access token sử dụng refresh token
)

## Quản lí nội dung

### Bài viết
> Sử dụng ajax hoặc tương tự

- [x] Xem bài viết (
	- [ ] Tự động load thêm bài viết khi cuộn xuống cuối trang (10 bài/lần load)
	- [x] Xem tất cả bài viết của 1 user bất kì
)
- [x] Đăng bài viết (
	- [ ] Đính kèm hình ảnh
	- [x] Đính kèm video url (youtube)
)
- [x] Sửa bài viết
- [x] Xóa bài viết

### Bình luận
> Sử dụng ajax hoặc tương tự

- [ ] Xem bình luận
- [ ] Đăng bình luận (
	- [ ] TẤT CẢ user có thể bình luận vào bài viết
)
- [ ] Xóa bình luận

## Quản lí thông báo

- [ ] Xem thông báo (
	- [ ] Sử dụng pagination, mỗi trang 10 thông báo
	- [ ] Xem chi tiết thông báo
	- [ ] Lọc thông báo theo Phòng/khoa
)
- [ ] Tạo thông báo (
	- [ ] Hiển thị realtime dưới dạng notification (sử dụng **socket.io**)
)
- [ ] Sửa thông báo
- [ ] Xóa thông báo

## UI UX

- [ ] Responsive web design

## Deploy

- [ ] Deploy web lên miền bất kì

# REFs

[Organize MERN STACK file structure](https://stackoverflow.com/questions/51126472/how-to-organise-file-structure-of-backend-and-frontend-in-mern)

[Google authentication sử dụng PassportJS, NodeJS](https://viblo.asia/p/authentication-with-google-oauth-using-nodejs-passportjs-mongodb-gAm5yqAV5db)

[Token (access token) và Refresh token](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

[Differences between storing JWT tokens in localStorage and in cookies](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)

[How Http Cookies work](https://stackoverflow.com/questions/6922145/what-is-the-difference-between-server-side-cookie-and-client-side-cookie)

[Practice auth-ing with tokens](https://anonystick.com/blog-developer/json-web-token-jwt-thuc-hanh-su-dung-refresh-token-khi-token-het-han-voi-nodejs-va-express-js-2020071649665528)

[Youtube URL validator](https://stackoverflow.com/questions/2964678/jquery-youtube-url-validation-with-regex)

[Express validator's document](https://express-validator.github.io/docs/index.html)

[Setup timestamps for mongoose's models](https://masteringjs.io/tutorials/mongoose/timestamps)

[Environment for development and production](https://stackoverflow.com/questions/55406055/toggle-between-multiple-env-files-like-env-development-with-node-js)

[Is it safe to use MongoDB's _id on client](https://www.reddit.com/r/mongodb/comments/hmav7b/is_it_safe_to_use_mongodbs_id_on_the_frontend/)

[Connect client and server in MERN stack web apps](https://wookenstein.medium.com/mern-full-stack-tutorial-2020-part-3-connect-frontend-backend-afefb8dc1b42)

[Mongo db Comment model with replies](https://stackoverflow.com/questions/51118842/mongodb-comments-replies-database-analysis)

[Reduce mongoose query executing speed](https://anonystick.com/blog-developer/mongodb-query-tu-595-seconds-xuong-03-seconds-2021060897018563)

[Array of comments or comemnt collection](https://www.mongodb.com/t/build-a-schema-for-post-and-comments-array-of-comments-objectid-or-post-objectid-in-each-comment/108632)
****