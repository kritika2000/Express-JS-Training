const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.json());

app.put("/api/people/:id", (req, res) => {
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

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params; // the param indicating where we need to make an update.
  const ind = people.findIndex((p) => p.id == id);
  if (ind == -1) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id: ${id}` });
  }
  const updatedPeople = people.filter((p) => p.id != id);
  res.status(201).json(updatedPeople);
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
