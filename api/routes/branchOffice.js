const { Router } = require("express");
const router = Router();
const BranchOffice = require("../models/BranchOffice");
const User = require("../models/User");
const operation = require("../utils/functions");

router.post("/admin/:adminId/add", async (req, res) => {
  const {
    location,
    address,
    phone,
    email,
    startTime,
    endTime,
    days,
    simultAppointment,
  } = req.body;
  const newBranchOffice = new BranchOffice({
    location,
    address,
    phone,
    email,
    startTime,
    endTime,
    days,
    simultAppointment,
  });
  const { adminId } = req.params;
  try {
    const userAdmin = await User.findOne({ _id: operation.parseId(adminId) });
    if (userAdmin.admin === true) {
      const saveBranchOffice = await newBranchOffice.save();
      res.json({ error: null, data: saveBranchOffice });
    } else {
      res
        .send("You don't have permission to create a new branch office")
        .status(404);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/admin/:adminId/showBranch", async (req, res) => {
  const { adminId } = req.params;
  const userAdmin = await User.findOne({ _id: operation.parseId(adminId) });
  if (userAdmin.admin === true) {
    BranchOffice.find({}, (err, result) => {
      if (err) {
        res.json({ error: "Error" });
      } else {
        res.json({ data: result });
      }
    });
  } else {
    res.send("You don't have permission to view all branches").status(404);
  }
});

router.delete("/admin/:adminId/delete/:id", async (req, res) => {
  const { adminId } = req.params;
  const userAdmin = await User.findOne({ _id: operation.parseId(adminId) });
  const { id } = req.params;
  try {
    if (userAdmin.admin === true && adminId !== id) {
      await BranchOffice.deleteOne({ _id: operation.parseId(id) });
      res.sendStatus(204);
    } else if (adminId === id) {
      res.send("You can't remove the permission yourself").status(404);
    }
  } catch {
    res.sendStatus(500);
  }
});

router.put("/admin/:adminId/:id", async (req, res) => {
  const { adminId } = req.params;
  const { id } = req.params;
  const {
    address,
    phone,
    email,
    startTime,
    endTime,
    days,
    simultAppointment,
    price,
  } = req.body;
  const userAdmin = await User.findOne({ _id: operation.parseId(adminId) });
  try{
  if (userAdmin.admin === true) {
    BranchOffice.updateOne(
      { _id: operation.parseId(id) },
      {
        address,
        phone,
        email,
        startTime,
        endTime,
        days,
        simultAppointment,
        price,
      },
      (err, docs) => {
        if (err) {
          res.json({ error: "Error" });
        } else {
          res.send({
            items: docs,
          });
        }
      }
    );
  } else {
    res
      .send("You don't have permission to modify the information of a branch")
      .status(404);
  }}
  catch(error){
    res.status(404).json(error);
  }
});

module.exports = router;
