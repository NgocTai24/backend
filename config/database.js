const mongoose = require("mongoose");
module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect thành công!");
    } catch (error) {
        console.log("connect thất bại!");
    }
}

