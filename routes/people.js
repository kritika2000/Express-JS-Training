/** Grouping routes */
const express = require("express");
//router instance to take care of routing.
const router = express.Router();
// const { people } = require("../data");
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

/*
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

router.post("/postman", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, person: name });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

router.put("/:id", (req, res) => {
  const { id } = req.params; //the param indicating where we need to make an update.
  const { name } = req.body; //updated value.
  const ind = people.findIndex((p) => p.id == id);
  if (ind == -1) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
  const updatedPeople = [...people];
  updatedPeople[ind] = { id, name };
  res.status(201).json(updatedPeople);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params; //the param indicating where we need to make an update.
  const ind = people.findIndex((p) => p.id == id);
  if (ind == -1) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
});

*/

/************************************ Using Controllers ***************************** */

router.get("/", getPeople);

router.post("/postman", createPersonPostman);

router.post("/", createPerson);

router.put("/:id", updatePerson);

router.delete("/:id", deletePerson);

module.exports = router;
