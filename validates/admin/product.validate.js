module.exports.createPost  = (req, res , next ) =>{
    if(!req.body.title){
        req.flash('error', `Vui lòng nhập tiêu đề !`);// hiển thị thông báo ra bên ngoài
        res.redirect("back"); // quay lại trang ban đầu
        return;
    }
    next();
}