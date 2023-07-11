const express = require("express");
const app = express();
let { people } = require("./data");

//static assets
app.use(express.static("./methods-public"));

//get the form data as urlencoded -> express.urlencoded parse the incoming requests with urlencoded payloads.
app.use(express.urlencoded({ extended: false }));

//handling form data when it is json.
app.use(express.json());

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  // send the response -> can be seen in the Response tab in dev tools.
  res.status(201).json({ success: true, data: [...people, name] });
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  // send the response -> can be seen in the Response tab in dev tools.
  res.status(201).json({ success: true, person: name });
});

// This will be called when the method in the form is GET, and the form-data can be extracted from query string.
app.get("/login", (req, res) => {
  const { name } = req.query;
  console.log(req.body); //not accessible here.
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
