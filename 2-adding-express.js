// Import the installed express module.
const express = require("express");
/**
 *
 * Express.js provides an easy way to create web server and render HTML pages for different HTTP requests
 * by configuring routes for your application.
 *
 * The express module returns a function. This function returns an object which can be used to configure
 * Express application (app in the above example). The app object includes methods for routing HTTP requests(get, put,
 * post, delete), configuring middleware, rendering HTML views and registering a template engine.
 *
 */
const app = express(); // this creates a server instance for use just like http.createServer().

/**************************************** SETTING ROUTES ************************************************ */

// In Express we have to explicitly handle the home route('/').
app.get("/", (req, res) => {
  // This callback function will be invoked everytime user requestime something with '/' route.
  /** res.end() vs res.send() vs res.json() ->
   * https://stackoverflow.com/questions/29555290/what-is-the-difference-between-res-end-and-res-send
   * https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
   * */
  // res.send({ name: "Kritika" });
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

/**
 * If we try to request a resource via a route that doesn't exist here, then we get 'Cannot GET /example' message in
 * the browser. In the network tab we see 404 for the resource requested.
 */

/**
 *
 * The app.all() function is used to routing all types of HTTP request. Like if we have POST,
 * GET, PUT, DELETE, etc, request made to any specific route, let say /user, so instead to defining
 * different API’s like app.post(‘/user’), app.get(‘/user’), etc, we can define single API app.all(‘/user’)
 * which will accept all type of HTTP request.
 *
 */
app.all("*", (req, res) => {
  // Add status with the response.
  res.status(404).send("<h1>Resource Not Found</h1>");
});

/**************************************** SERVER STARTED LISTENING ************************************************ */

app.listen(5000, () => {
  console.log("Express Server Running...");
});
