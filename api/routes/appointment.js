const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");

//Crear un nuevo turno
router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  const { date, month, year, day, time } = req.body;
  const branchOfficeId = req.body._id;
  console.log("***BRANCH OFFICE ID***", branchOfficeId);

  const newAppointment = new Appointment({
    date,
    month,
    year,
    day,
    time,
  });
  console.log("***NEW APPOINTMENT***", newAppointment);

  try {
    const branchOffice = await BranchOffice.findOne({
      _id: parseId(branchOfficeId),
    });
    console.log("***BRANCH OFFICE***", branchOffice);
    const appointment = await Appointment.findOne({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
    });
    console.log("***APPOINTMENT***", appointment);

    if (appointment == null) {
      const saveAppointment = await newAppointment.save();
      console.log("***SAVE APPOINTMENT DE UNO NULL***", saveAppointment);
      const updateBranchOffice = await BranchOffice.updateOne(
        { _id: branchOfficeId },
        { $push: { appointment: saveAppointment._id } }
      );
      console.log("***UPDATE BRANCH OFFICE DE UNO NULL***", updateBranchOffice);
      const updateUser = await User.updateOne(
        { _id: userId },
        { $push: { appointment: saveAppointment._id } }
      );
      console.log("SOY BRANCH SIMUL AP", branchOffice.simultAppointment);
      console.log("***UPDATE USER DE UNO NULL***", updateUser);
      return res.status(200).json("Turno creado");
    }

    if (branchOffice.simultAppointment === 1) {
      if (appointment) {
        console.log("SOY EL TURNO QUE EXISTE", appointment);
        return res.json({ error: "Turno no disponible" });
      }
    } else if (branchOffice.simultAppointment > 1) {
      if (appointment.length >= branchOffice.simultAppointment) {
        console.log("***APPOINTMENT LENGTH***", appointment.length);
        return res.json({ error: "Turno no disponible" });
      } else {
        const saveAppointment = await newAppointment.save();
        const updateBranchOffice = await BranchOffice.updateOne(
          { _id: branchOfficeId },
          { $push: { appointment: saveAppointment._id } }
        );
        const updateUser = await User.updateOne(
          { _id: userId },
          { $push: { appointment: saveAppointment._id } }
        );
        //console.log("***SAVE APPOINTMENT***", saveAppointment);
        //console.log("***UPDATEBRANCH***", updateBranchOffice);
        //console.log("***UPDATEUSER***", updateUser);
        return res.status(200).json("Turno creado");
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//Cancelar un turno - modificar estado en la base de datos

//Mostrar todos los turnos con el formato de arreglo de objetos
router.get("/", (req, res) => {
  //const branchOfficeId = req.body._id;
  Appointment.find({}, (err, result) => {
    if (err) {
      res.json({ err: "Error" });
    } else {
      res.json({ data: result });
    }
  });
});

module.exports = router;
