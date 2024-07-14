exports.pageNotFound = (req, res, next) => {
  res.render("pageNotFound/pageNotFound.ejs", {
    path: "",
    pageTitle: "Page Not Found",
  });
};
