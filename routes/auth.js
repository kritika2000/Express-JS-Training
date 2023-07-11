const express = require("express");
const router = express.Router();
const { people } = require("../data");

router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});

module.exports = router;
