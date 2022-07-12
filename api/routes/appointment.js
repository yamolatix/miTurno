const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");
//const Buscar = require("../utils/Buscar");
const NewAppointment = require("../utils/NewAppoinment");

// Collecion Appointment: no impacta a la sucursal a la que pertenece
// Collecion BranchOffice: no impactan los appointments
//Collecion User: no impacta el appointment

//A - Crear un nuevo turno
router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const { date, month, year, day, time, id } = req.body;
  const branchOfficeId = req.body.id;

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
  console.log("SOY NEWAPPOINT", newAppointment);
  try {
    const branchOffice = await BranchOffice.findOne({
      _id: parseId(branchOfficeId),
    });
    const appointment = await Appointment.find({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
    });
    console.log("SOY APPOINT", appointment);
    //APPOINTMENTFALSE = Turno tomado
    const appointmentFALSE = await Appointment.find({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
      available: false,
    });
    //APPOINTMENTTRUE = Turno cancelado
    const appointmentTRUE = await Appointment.find({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
      available: true,
    });
    console.log("SOY APPOINTMENFALSE", appointmentFALSE);
    console.log("SOY APPOINTMENTRUE", appointmentTRUE);

    // (A.1) Existe en Base Appoiment un turno para ese mismo dia, horario, sucursa
    if (appointment.length === 0) {
      // (A.1.1) No Exise. Lo tomo
      const saveAppointment = await newAppointment.save();
      const saveAppointmentId = saveAppointment._id;
      NewAppointment(branchOfficeId, userId, saveAppointmentId);
      res.status(200).json("Turno creado");
    }
    // (A.1.2) Si existe

    // (A.2) Permite Base brandOffice otro turno en simultaneo
    if (appointment) {
      if (branchOffice.simultAppointment === 1) {
        // (A.2.1) No, no permite
        return res.json({
          error:
            "Turno no disponible dado que no se permiten turnos simultaneos",
        });
      }
      // (A.2.2) Si permite
      else {
        // (A.3) La cantidad de turnos actuales mas el que estoy pidiendo superan el limite de esa sucursal?
        // ej: tengo 4 turnos [0,1,2,3] y la sucursal permite 4 en simultaneo
        //Se debe contar el arreglo de turnos con estado no disponible dado que puede haber turnos creados
        //y disponibles porque fueron cancelados por el cliente, por lo tanto no se cuenta en el arreglo
        if (appointmentFALSE.length < branchOffice.simultAppointment) {
          // (A.3.2) no lo supera, tomo turno
          const saveAppointment = await newAppointment.save();
          const saveAppointmentId = saveAppointment._id;
          NewAppointment(branchOfficeId, userId, saveAppointmentId);
          return res.status(200).json("Turno creado");
        } else {
          // (A.3.1) Si lo supera,no tomo turno
          return res.json({
            error:
              "Turno no disponible, ya se han otorgado todos los disponibles",
          });
        }
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//Cancelar un turno por un usuario - (modificar estado en la base de datos)
router.put("/:userId/myAppointment/remove", async (req, res) => {
  const { userId } = req.params;
  const appointmentId = req.body.id;
  try {
    await Appointment.findOneAndUpdate({ _id: parseId(appointmentId) }, [
      { $set: { available: { $eq: [false, "$available"] } } },
    ]);
    const appointmentCanceled = await Appointment.findOneAndUpdate(
      { _id: parseId(appointmentId) },
      [{ $set: { state: "cancelado" } }]
    );
    res.status(200).json("Turno cancelado");
  } catch (err) {
    res.status(404).json(err);
  }
});

//modificar un turno - pendiente
router.put("/:userID/myAppointment/edit", async (req, res) => {
  const { userId } = req.params;
  const { date, month, year, day, time, id } = req.body;
  const appointmentId = req.body.id;
  const appointmentToChange = await Appointment.findOne({
    _id: parseId(appointmentId),
  });
});

//recibe por el body el id del turno y de la persona

//Mostrar todos los turnos de un usuario para el mismo

router.get("/:id/showAppointments", async (req, res) => {
  const { id } = req.params;
  console.log("**ID DE PARAMS**", id);
  try {
    await Appointment.find({ user: id }, (err, result) => {
      if (err) {
        return res.json({ err: "Error" });
      } else {
        console.log(result);
        return res.json({ data: result });
      }
    })
      .clone()
      .exec();
  } catch (err) {
    res.status(404).json(err);
  }
});

//Confirmar un turno - operador - VER CON MATI

router.put("/:operatorId/showAppointments", async (req, res) => {
  const { operatorId } = req.params;
  const appointmentId = req.body.id;
  try {
    const userOperator = await User.findOne({ _id: parseId(operatorId) });
    if (userOperator.operator === true) {
      await Appointment.findOneAndUpdate({ _id: parseId(appointmentId) }, [
        { $set: { state: "asistido" } },
      ]);
      res.status(200).json("Turno asistido/confirmado");
    } else {
      res
        .send("You don't have permission to create a new branch office")
        .status(404);
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

//Mostrar todos los turnos con el formato de arreglo de objetos
router.get("/", (req, res) => {
  Appointment.find({}, (err, result) => {
    if (err) {
      res.json({ err: "Error" });
    } else {
      res.json({ data: result });
    }
  });
});

// Muestra al operador los turnos de X sucursal del dia especificado.
router.get("/:operatorId/dayAppointments", async (req, res) => {
  const { operatorId } = req.params;
  const { date, month, year, time } = req.body;
  const branchOfficeId = req.body.id;

  try {
    const userOperator = await User.findOne({ _id: parseId(operatorId) });
    if (userOperator.operator === true) {
      await Appointment.find(
        { date, month, year, time, branchOfficeId },
        (err, result) => {
          if (err) {
            res.json({ err: "Error" });
          } else {
            res.json({ data: result });
          }
        }
      )
        .clone()
        .exec();
    } else {
      res
        .send("You don't have permission to create a new branch office")
        .status(404);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

/*
  const { date, month, year } = req.body;
  const branchOfficeId = req.body.id;
  const findBranch = await BranchOffice.find({ _id: branchOfficeId }).exec();
  start = findBranch[0].startTime;
  limit = findBranch[0].endTime;
  simultAppointment = findBranch[0].simultAppointment;
*/

module.exports = router;
