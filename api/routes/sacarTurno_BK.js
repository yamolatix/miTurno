const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");

let start,
  end,
  simultAppointment = "";

// Paso 1 - Arreglo de todos los turnos en la franja horaria para una fecha y una sucursal determinada
router.get("/tuTurnoPasoUno", async (req, res) => {
  const branchOfficeId = req.body.id;
  await BranchOffice.find({ _id: branchOfficeId }, (err, result) => {
    if (err) {
      res.json({ err: "Error" });
    } else {
      res.json({ data: result });
      start = result[0].startTime;
      limit = result[0].endTime;
      simultAppointment = result[0].simultAppointment;
    }
  }).clone();

  //   ----------------------- ----------------------------
  console.log("xxxxxxxxxxxxxxxxx");
  console.log("SOY START", start);
  console.log("SOY END", limit);
  console.log("SOY SIMULT", simultAppointment);

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

  arrFinal = [];
  hsArray.map((num) => {
    arrFinal.push({ [num]: simultAppointment });
  });
  console.log(arrFinal);
});

// Paso 3 - Arreglo de todos los turnos tomados en la franja horaria para una fecha y una sucursal determinada
let arreglosTomados = []


router.get("/tuTurnoPasoTres", async (req, res) => {
  const { date, month, year } = req.body;
  const branchOfficeId = req.body.id;
  await Appointment.find(
    { date, month, year, id: branchOfficeId, available: false },
    (err, result) => {
      if (err) {
        res.json({ err: "Error" });
      } else {
        res.json({ data: result });
      }
      result.map((turno) => arreglosTomados.push(turno.time))
      console.log("ARREGLO TURNOS TOMADOS", arreglosTomados)
    }
  ).clone();
});



module.exports = router;


