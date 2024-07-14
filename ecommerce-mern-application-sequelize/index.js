const express = require("express");
const path = require("path");
const app = express();
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const errorController = require("./controller/404");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

app.set("engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((result) => {
      req.user = result;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(errorController.pageNotFound);

//defining all Relations
User.hasMany(Product);
Product.belongsTo(User, { constrain: true, onDelete: "CASCADE" });

//Defining Cart relations
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

//Sync all the tables when server is started
sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Admin",
        email: "xcvkp@example.com",
        password: "admin",
      });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("App started on PORT:3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
