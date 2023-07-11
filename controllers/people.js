//Controllers contains our functionality.
const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params; //the param indicating where we need to make an update.
  const ind = people.findIndex((p) => p.id == id);
  if (ind == -1) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
