//[GET] /admin/products
const Product = require("../../models/product.model")

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

module.exports.index = async (req, res) => {
    // phần bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    // console.log(filterStatus);

    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    //phần tìm kiếm sản phẩm
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    // Phân Trang
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currenPage: 1,
            limitItem: 4
        },
        req.query,
        countProduct
    )
    // Kết thúcPhân Trang
    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    // console.log(products)

    res.render("admin/pages/products/index", {
        pageTitle: "Trang Sản Phẩm ",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    //console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Cập Nhật Trạng Thái Thành Công!');// hiển thị thông báo ra bên ngoài

    res.redirect("back"); // quay lại trang ban đầu
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Cập Nhật Trạng Thái Thành Công ${ids.length} Sản Phẩm !`);// hiển thị thông báo ra bên ngoài
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Cập Nhật Trạng Thái Thành Công ${ids.length} Sản Phẩm !`);// hiển thị thông báo ra bên ngoài
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    deleted: true,
                    deleteAt: new Date() // set thêm thời gian xóa
                }
            );
            req.flash('success', `Đã Xóa Thành Công ${ids.length} Sản Phẩm !`);// hiển thị thông báo ra bên ngoài
            break;
        case "change-position":
            for (const item of ids) {
                // console.log(item.split("-"));
                let [id, position] = item.split("-");
                position = parseInt(position);
                // console.log(id);
                // console.log(position); 
                await Product.updateOne({ _id: id }, { position: position })
                req.flash('success', `Đã Đổi Vị Trí Thành Công ${ids.length} Sản Phẩm !`);// hiển thị thông báo ra bên ngoài
            }
            break;
        default:
            break;
    }
    res.redirect("back");
    // res.location(req.get("Referer") || "/");
}
//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id }); // xóa vĩnh viễn

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date() // set thêm thời gian xóa
    }); // xóa tạm thời, có thể khôi phục
    req.flash('success', `Đã xóa Thành Công  Sản Phẩm !`);// hiển thị thông báo ra bên ngoài
    res.redirect("back"); // quay lại trang ban đầu
}


//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm Mới Sản Phẩm "

    });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log(req.file);
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }


    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    // console.log(req.params.id); //---> lấy ra dc params
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        // console.log(product);
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm ",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({_id: id }, req.body);
        req.flash('success', `Đã cập nhật Thành Công  Sản Phẩm !`);
    } catch (error) {
        req.flash('error', `Cập nhật thất bại !`);
    }
    res.redirect("back"); // quay lại trang ban đầu
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    // console.log(req.params.id); //---> lấy ra dc params
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        console.log(product);
        
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}