const express = require("express");
const path = require("path");
const app = express();
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const errorController = require("./controller/404");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

app.set("engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

//Registering new middleware so that we can have atleast one User to be fetched
app.use((req, res, next) => {
  const user = User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(errorController.pageNotFound);

//Table/Models association
Product.belongsTo(User, { constrain: true, onDelete: "CASCADE" }); // user created this product, implies that once user is deleted, product is deleted.
User.hasMany(Product); //One User can have many products

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

//Sync all the tables when server is started
sequelize
  .sync()
  // .sync({ force: true }) // implies that whatever existing data/tables is there forcely delete it. Note don't use this in production
  .then((result) => {
    // console.log(result);

    //Setting up default user until Authentication
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Somil Bichpuriya",
        email: "plsgq@example.com",
      });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    // console.log("Created Cart", cart);
    app.listen(3000, () => {
      console.log("App started on PORT:3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
