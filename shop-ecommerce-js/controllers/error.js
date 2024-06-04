exports.notFound = (req, res, next) => {
  res.render("404", { pageTitle: "404 - Page not found" });
};
