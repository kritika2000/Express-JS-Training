/**
 * MiddleWare is the heart of express js.
 * It sits between request from the client and the response send by the server.
 * req => middleware => res.
 * https://selvaganesh93.medium.com/how-node-js-middleware-works-d8e02a936113
 */

const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");

// With this set up we will need to add this logger middleware to every route of our application if needed.
/*
  This is fine if we want to attach middleware for one or two routes.
  const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};
*/

/**
 * We can use app.use when we want to invoke the middleware with every route.
 * Add it above all the routes/remove path parameter to see this running for all routes.
 * We can add a path as the first parameter to apply execute the middleware function
 * for specific routes.
 */
/*  api/home/about/products -> this middle ware will be applied on any route after this api route.
    app.use("/api", logger);
*/

/** Executing multiple middleware functions */
//app.use([logger, authorize]);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});

// app.get("/about", logger, (req, res) => {
//   res.send("About");
// });

app.get("/about", logger, (req, res) => {
  console.log(req.user);
  res.send("About");
});

// If the path is '/api' then the middleware would run for this route only.
app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});

/**
 * We have 3 options either we can create our own middleware functions or can use which are provided by
 * express or use third party middleware(eg:- morgan).
 * app.use is expecting a middleware -> express.static('./public'). This middleware send all the static resources.
 * app.use(express.static('./public')).
 */
