const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "Kritika") {
    // Manipulating req object. Now for every route where we invoked middleware, they've access to this property.
    req.user = { name: "Kritika", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
