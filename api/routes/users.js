const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const mongoose = require("mongoose");

//change data of user
const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
}; //this function change id string into a ObjectId

router.put("/me/:id", (req, res) => {
  const { id } = req.params;
  const { address, phone, birthdate } = req.body;
  User.updateOne(
    { _id: parseId(id) },
    { address, phone, birthdate },
    (err, docs) => {
      res.send({
        items: docs,
      });
    }
  );
});

//show all users
router.get("/showUsers", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.json({ error: "Error" });
    } else {
      res.json({ data: result });
    }
  });
});

//delete users
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await User.deleteOne({ _id: id })
  res.sendStatus(204)
});

//show profile

module.exports = router;
