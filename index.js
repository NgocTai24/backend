const express = require("express");
// nhúng database
const database = require("./config/database");
// nhúng methodOverride để dùng phương thưc PATCH
const methodOverride = require('method-override')
// NHúng flash để hiện thị thông báo
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');



const bodyParser = require('body-parser');

const systemConfig = require("./config/system");

require("dotenv").config();

// nhúng routes vào 
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
// gọi hàm connect để kết nối vs database
database.connect();


const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views" ,  `${__dirname}/views`);
app.set("view engine" , "pug");

//Flassh
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// biến app toàn cục
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Nhúng file tĩnh vào
app.use(express.static(`${__dirname}/public`));

// gọi route
routeAdmin(app);
route(app);

app.listen(port ,() =>{
    console.log(`Chay thanh cong vao cong ${port}`);
});