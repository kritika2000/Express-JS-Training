/** It is cumbersome to use our previous set up when we have too many routes.
 * Solution: express-routers where we group routes together and set the functionalities asseparate
 * controllers.
 */
const express = require("express");
const app = express();
const people = require("./routes/people");
const login = require("./routes/auth");

//static assets
app.use(express.static("./methods-public"));

//parse from data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

//add api/people routes
app.use("/api/people", people);

// add /login routes
app.use("/login", login);

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
