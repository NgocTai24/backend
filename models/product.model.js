const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    position: Number,
    status: String,
    slug: { 
        type: String,
        slug: "title",
        unique: true // slug không bị trùng 
    },
    deleted: {
        type: Boolean,
        default: false
    },
    thumbnail: String,
    deleteAt: Date
}, {
    timestamps: true // để thêm thời gian tạo và sửa sp
});

const Product = mongoose.model('Product', ProductSchema, "products");
module.exports = Product;