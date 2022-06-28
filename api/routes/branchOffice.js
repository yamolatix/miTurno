const { Router } = require("express");
const router = Router();
const BranchOffice = require("../models/BranchOffice");

router.post("/add", async (req, res) => {
  const {
    location,
    address,
    phone,
    email,
    startTime,
    endTime,
    days,
    simultAppointment
  } = req.body;

  const newBranchOffice = new BranchOffice({

    location,
    address,
    phone,
    email,
    startTime,
    endTime,
    days,
    simultAppointment

  });

console.log(newBranchOffice);

  try {
    const saveBranchOffice = await newBranchOffice.save();
    res.json({ error: null, data: saveBranchOffice });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
