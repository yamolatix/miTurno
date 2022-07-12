const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");

let start,
  end,
  simultAppointment = "";

// Paso 1 - Arreglo de todos los turnos en la franja horaria para una fecha y una sucursal determinada
router.get("/", async (req, res) => {
  const { date, month, year } = req.body;
  const branchOfficeId = req.body.id;
  const findBranch = await BranchOffice.find({ _id: branchOfficeId }).exec();
  start = findBranch[0].startTime;
  limit = findBranch[0].endTime;
  simultAppointment = findBranch[0].simultAppointment;

  //   ----------------------- ----------------------------
  // Paso 2 - capturar los datos de la consulta y armar la franja horaria

  let hsArray = [];

  // variables a setear
  //   let start = "7:15";
  //   let limit = "17:30";
  let intervaloTurno = "00:15";
  //   let simultAppointment = 2;

  // start pasado a string de 5 digitos (de 7:00 a 07:00)
  startString = start.length == 4 ? `0${start}` : start;
  // console.log(startString);

  limitString = limit.length == 4 ? `0${limit}` : limit;
  // console.log(limitString);

  // start fragmentation
  const startHs = parseInt(start.slice(0, 2));
  // console.log(startHs);

  const startMinutes = parseInt(start.slice(3, 5));
  // console.log(startMinutes);

  // limit fragmentation
  const limitHs = parseInt(limit.slice(0, 2));
  // console.log(limitHs);

  const limitMinutes = parseInt(limit.slice(3, 5));
  // console.log(limitMinutes);

  // intervaloTurno fragmentation
  const turnosxHS = 60 / parseInt(intervaloTurno.slice(3, 5)) - 1;
  // console.log(turnosxHS);

  const intervaloMinutos = parseInt(intervaloTurno.slice(3, 5));
  // console.log(intervaloMinutos);

  // arreglo de franja horaria
  for (h = startHs; h <= limitHs; h++) {
    for (m = 0; m <= turnosxHS; m++)
      hsArray.push(
        (h <= 9 ? `0${h}` : `${h}`) +
          ":" +
          (m === 0 ? "00" : m * intervaloMinutos)
      );
  }

  hsArray;

  // ajustar el inicio del arreglo
  hsArray = hsArray.slice(hsArray.indexOf(startString));

  // ajustar el fin del arreglo
  hsArray = hsArray.slice(0, hsArray.indexOf(limitString));

  let arrFranjaHoraria = [];
  hsArray.map((num) => {
    arrFranjaHoraria.push({ [num]: simultAppointment });
  });

  // Paso 3 - Arreglo de todos los turnos tomados en la franja horaria para una fecha y una sucursal determinada
  const findAppointment = await Appointment.find({
    date,
    month,
    year,
    id: branchOfficeId,
    available: false,
  }).exec();

  let reservedAppointment = [];

  findAppointment.map((turno) => reservedAppointment.push(turno.time));

  const reservedAppointmentCounts = {};

  reservedAppointment.forEach(function (i) {
    reservedAppointmentCounts[i] = reservedAppointmentCounts[i]
      ? reservedAppointmentCounts[i] + 1
      : 1;
  });
  const reservedAppointmentObj = Object.keys(reservedAppointmentCounts).map(
    (key) => {
      return { [key]: reservedAppointmentCounts[key] };
    }
  );

  arrFranjaHoraria.map((franja) => {
    for (let horario in franja) {
      reservedAppointmentObj.map((franja2) => {
        for (let horario2 in franja2) {
          if (horario === horario2) {
            franja[horario] = franja[horario] - franja2[horario2];
          }
        }
      });
    }
  });

  res.json({ data: arrFranjaHoraria });
});

// 1) MOSTRAR EN FORMATO ARREGLO DE OBJETOS TODOS LOS TURNOS DISPONIBLES PARA UN DÍA, HORARIO Y SUCURSAL - A UTILIZAR EN EL CALENDARIO

module.exports = router;
