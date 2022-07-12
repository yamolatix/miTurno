const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");

let start,
  end,
  simultAppointment = "";

// Paso 1 - Arreglo de todos los turnos en la franja horaria para una fecha y una sucursal determinada
router.get("/tuTurno", async (req, res) => {
  const { date, month, year } = req.body;
  const branchOfficeId = req.body.id;
  const findBranch = await BranchOffice.find({ _id: branchOfficeId }).exec();
  start = findBranch[0].startTime;
  limit = findBranch[0].endTime;
  simultAppointment = findBranch[0].simultAppointment;

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

  console.log("FRANJA HORARIA", arrFranjaHoraria);
  //console.log("TURNOS TOMADOS", reservedAppointment);

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
  //console.log("SOY RESERVED APPONT COUNTS", reservedAppointmentCounts);
  console.log("SOY RESERVED APPOINTEMENT", reservedAppointment);
  console.log("SOY RESERVED APPOINTEMENT IN OBJE", reservedAppointmentObj);

//   const availableAppointment = Object.fromEntries(
//     Object.entries(arrFranjaHoraria).map( ([k, v]) => [k, v - reservedAppointmentObj[k]] )
// );

  const difference = (obj1, obj2) => {
    const arrObj1 = Object.entries(obj1)
    const arrObj2 = Object.entries(obj2)
    console.log("SOY UN ARREGLO DEL OBJETO 1", arrObj1);
    console.log("SOY UN ARREGLO DEL OBJETO 2", arrObj2);
  }
  // CON LA FUNCIÓN DE ARRIBA TRATE DE CONVERTIR EL ARRAY DE OBJETOS A UN ARRAY DE ARRAY, ES DECIR ["13:00", 3] Y ASÍ CON CADA UNO PERO TENEMOS QUE VER COMO PASAR LA KEY DE TAL FORMA QUE NO QUEDE COMO "0", "1" QUE ES LO QUE HACE AHORA, GRRRR HIJO DE PERRA
  
 const availableAppointment = difference(arrFranjaHoraria, reservedAppointmentObj);
  

  // for (let value in arrFranjaHorariaObj) {
  //   if(arrFranjaHorariaObj.hasOwnProperty(value)){
  //     availableAppointment[value] = arrFranjaHorariaObj[value] - reservedAppointmentCounts[value];
  //   }
  // }

  // const availableAppointment = Object.keys(arrFranjaHorariaObj).reduce(
  //   (acc, curr) => (
  //     (acc[curr] = arrFranjaHorariaObj[curr] - reservedAppointmentObj[curr]),
  //     acc
  //   ),
  //   {}
  // );

  console.log("SOY TURNOS DISPONIBLES", availableAppointment);

  res.json("RESPUESTA A MODO DE EJEMPLO");
});
module.exports = router;
