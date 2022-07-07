const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");

// 62c712f4c261b4d23d5b93b6

// Collecion Appointment: no impacta a la sucursal a la que pertenece
// Collecion BranchOffice: no impactan los appointments
//Collecion User: no impacta el appointment

//A - Crear un nuevo turno
router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  const { date, month, year, day, time } = req.body;
  const branchOfficeId = req.body._id;

  const newAppointment = new Appointment({
    date,
    month,
    year,
    day,
    time,
    branchOffice: branchOfficeId,
    user: userId,
  });
  // Busco turno para ese mismo dia, horario, sucursal
  //ej Hoy 15:00 en RG1
  try {
    const branchOffice = await BranchOffice.findOne({
      _id: parseId(branchOfficeId),
    });
    const appointment = await Appointment.findOne({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId
    });

    // (A.1) Existe en Base Appoiment un turno para ese mismo dia, horario, sucursa
    if (appointment == null) {

    // (A.1.1) No Exise. Lo tomo
      const saveAppointment = await newAppointment.save();

       // Tomo turno nuevo - cambios en collection BrandOffice 
      const updateBranchOffice = await BranchOffice.updateOne(
        { _id: branchOfficeId },
        { $push: { appointment: parseId(saveAppointment._id) } }
      ).populate("branchOffice")

       // Tomo turno nuevo - cambios en collection User 
      const updateUser = await User.updateOne(
        { _id: userId },
        { $push: { appointment: parseId(saveAppointment._id) } }
      ).populate("user")

      // Tomo turno nuevo - cambios en collection Appoinment 
      await Appointment.findOneAndUpdate({ _id: parseId(saveAppointment._id) }, [
        { $set: { available: { $eq: [false, "$available"] } } },
      ])

      await Appointment.findOneAndUpdate({ _id: parseId(saveAppointment._id) }, [
        { $set: { state: state } },
      ])

      return res.status(200).json("Turno creado");
    }
    // (A.1.2) Si existe 

    // (A.2) Permite Base brandOffice otro turno en simultaneo
    if (appointment && branchOffice.simultAppointment === 1) {

      // (A.2.1) No, no permite
      return res.json({ error: "Turno no disponible" });
    }

    // (A.2.2) Si permite
    else if (appointment && branchOffice.simultAppointment > 1) {

    // (A.3) La cantidad de turnos actuales mas el que estoy pidiendo superan el limite de esa sucursal?
    // ej: tengo 4 turnos [0,1,2,3] y la sucursal permite 4 en simultaneo
      if (appointment.length >= branchOffice.simultAppointment) {

      // (A.3.1) Si lo supera,no tomo turno
        return res.json({ error: "Turno no disponible" });
      }
      // (A.3.2) no lo supera, tomo turno
      else {
        const saveAppointment = await newAppointment.save();

        const updateBranchOffice = await BranchOffice.updateOne(
          { _id: branchOfficeId },
          { $push: { appointment: parseId(saveAppointment._id) } }
        ).populate("branchOffice")

        const updateUser = await User.updateOne(
          { _id: userId },
          { $push: { appointment: parseId(saveAppointment._id) } }
        ).populate("user")

        // const data = await Appointment.schema.path('status').options.enum;
        // console.log(data); 

        await Appointment.findOneAndUpdate({ _id: parseId(saveAppointment._id) }, [
          { $set: { available: { $eq: [false, "$available"] } } },
        ])

        await Appointment.findOneAndUpdate({ _id: parseId(saveAppointment._id) }, [
          { $set: { state: { $eq: ["reservado", "$state"] } } },
        ])

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
