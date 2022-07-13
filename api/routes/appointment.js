/* RUTAS
1) CREAR TURNO / MODIFICA UN TURNO EXISTENTE CANCELANDOLO (CAMBIA ESTADO DE AVAILABLE FALSE A TRUE Y STATE DE RESERVADO A CANCELADO)
2) CANCELAR UN TURNO POR EL USUARIO
3) MOSTRAR TODOS LOS TURNOS DE UN USUARIO CON TODOS SUS ESTADOS
4) CONFIRMAR UN TURNO POR UN OPERADOR
5) MOSTRAR TODOS LOS TURNOS PARA UN DÍA, HORARIO Y SUCURSAL SELECCIONADA POR EL OPERADOR
6) MOSTRAR TODOS LOS TURNOS CON EL FORMATO DE ARREGLO DE OBJETOS SIN NINGÚN TIPO DE VALIDACIÓN - COMENTADA PORQUE NO SE UTILIZARÍA
7) CAMBIA EL ESTADO DEL TURNO A CONFIRMADO
8) Eliminar reserva de turno
*/


const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");
const NewAppointment = require("../utils/NewAppoinment");
const Cancelar = require("../utils/Cancelar");

//1)
//A - Crear un nuevo turno
router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  const { date, month, year, day, time } = req.body;
  const branchOfficeId = req.body.branchId;
  const appointmentId = req.body.appointId;

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

    const appointment = await Appointment.find({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
    });

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

    const appointmentTRUE = await Appointment.find({
      date,
      month,
      year,
      day,
      time,
      branchOffice: branchOfficeId,
      available: true,
    });

    const appointmentSameUser = await Appointment.find({
      date,
      month,
      year,
      available: false,
      user: userId
    });

    // (A.1) Existe en Base Appoiment un turno para ese mismo dia, horario, sucursal

    if (appointment.length === 0) {
      // (A.1) No Existe. Ahora Consulto si el Usuario ya tiene turno para ese dia
      // (A.1.1) Si tiene le rechazo la peticion
      if (appointmentSameUser.length > 0) {
        return res.status(200).json({ error: "Usted ya tiene un turno activo para este dia" })
        // (A.1.2) Si no tiene, le acepto el turno 
      } else {
        const saveAppointment = await newAppointment.save();
        const saveAppointmentId = saveAppointment._id;
        NewAppointment(branchOfficeId, userId, saveAppointmentId);
        // (B) Ademas, si esto sucede desde modificar, el turno anterior que figura en el req.body lo cancelo
        if (appointmentId) {
          Cancelar(appointmentId);
        }
        return res.status(200).json(saveAppointment);
      }
    }

    // (A.2) Si existe.
    // Ahora Consulto si el Usuario ya tiene turno para ese dia
    // (A.2.1)Si tiene, le rechazo la peticion
    if (appointmentSameUser.length > 0) {
      return res.status(200).json({ error: "Usted ya tiene un turno activo para este dia" })
    }

    // (A.2.2) No tiene, avanzo con el siguiente filtro
    // Permite Base brandOffice otro turno en simultaneo
    if (appointment) {
      if (branchOffice.simultAppointment === 1) {
        // (A.2.2.1) No, no permite
        return res.json({
          error:
            "Turno no disponible dado que no se permiten turnos simultaneos",
        });
      }
      // (A.2.2.2) Si permite
      else {
        if (appointmentFALSE.length < branchOffice.simultAppointment) {
          // (A.2.2.2.1) no lo supera, tomo turno
          const saveAppointment = await newAppointment.save();
          const saveAppointmentId = saveAppointment._id;
          NewAppointment(branchOfficeId, userId, saveAppointmentId);
          // (B) Ademas, si esto sucede desde modificar, el turno anterior que figura en el req.body lo cancelo
          if (appointmentId) {
            Cancelar(appointmentId)
          }
          return res.status(200).json(saveAppointment);
        } else {
          // (A.2.2.2.2) Si lo supera,no tomo turno
          return res.json({
            error:
              "Turno no disponible, ya se han otorgado todos los disponibles",
          });
        }
      }
    }
  } catch (error) {
    return res.status(405).json(error);
  }
});

//2) Cancelar un turno por un usuario - (modificar estado en la base de datos)
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

//3) Mostrar todos los turnos de un usuario para el mismo
router.get("/:id/showAppointments", async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.find({ user: id }, (err, result) => {
      if (err) {
        return res.json({ err: "Error" });
      } else {
        return res.json({ data: result });
      }
    })
      .clone()
      .exec();
  } catch (err) {
    res.status(404).json(err);
  }
});

//4) Confirmar un turno - operador
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

// 5) Muestra al operador los turnos de X sucursal del dia especificado.
router.get("/:operatorId/dayAppointments", async (req, res) => {
  const { operatorId } = req.params;
  const { date, month, year, time } = req.headers;
  const branchOfficeId = req.headers.id;

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

//6) Mostrar todos los turnos con el formato de arreglo de objetos
// router.get("/", (req, res) => {
//   Appointment.find({}, (err, result) => {
//     if (err) {
//       res.json({ err: "Error" });
//     } else {
//       res.json({ data: result });
//     }
//   });
// });

//7)Turno Confirmado
router.put("/:userId/myAppointment/confirmed", async (req, res) => {
  const { userId } = req.params;
  const appointmentId = req.body.id;

  try {
    const appointmentConfirm = await Appointment.findOneAndUpdate(
      { _id: parseId(appointmentId) },
      [{ $set: { state: "confirmado" } }]
    );
    res.status(200).json("miTurno ha sido confirmado!");
  } catch (err) {
    res.status(404).json(err);
  }
});

//8)Eliminar reserva de turno

router.delete("/:userId/myAppointment/deleteAppointment", async (req, res) => {
  const { userId } = req.params;
  const appointmentId = req.body.appointId;
  const branchOfficeId = req.body.branchId;

  try {
    const deleteAppointment = await Appointment.deleteOne({ _id: parseId(appointmentId) })
    res.status(204).json("Su reserva a caducado")
    // elimina de BranchOffice el turno
    const deleteAppointmentBranch = await BranchOffice.findByIdAndUpdate(branchOfficeId, {
      $pull: { appointment: parseId(appointmentId) }
    })
    // elimina de User el turno
    const deleteAppointmentUser = await User.findByIdAndUpdate(userId, {
      $pull: { appointment: parseId(appointmentId) }
    })

  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router;