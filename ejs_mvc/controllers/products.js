const products = [];
exports.getAddProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  products.push({
    productName: productName,
    productPrice: productPrice,
    productDescription: productDescription,
    productImage: productImage,
  });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", { pageTitle: "Shop", prods: products });
};
