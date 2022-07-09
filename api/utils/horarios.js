let hsArray = [];

// variables a setear
let start = "7:15";
let limit = "17:30";
let intervaloTurno = "00:15";
let simultAppointment = 2


// start pasado a string de 5 digitos (de 7:00 a 07:00) 
startString = start.length ==4? `0${start}`: start
console.log(startString)

limitString = limit.length ==4? `0${limit}`: limit
console.log(limitString)

// start fragmentation
const startHs = parseInt(start.slice(0, 2));
console.log(startHs);

const startMinutes = parseInt(start.slice(3, 5));
console.log(startMinutes);

// limit fragmentation
const limitHs = parseInt(limit.slice(0, 2));
console.log(limitHs);

const limitMinutes = parseInt(limit.slice(3, 5));
console.log(limitMinutes);

// intervaloTurno fragmentation
const turnosxHS = 60 / parseInt(intervaloTurno.slice(3, 5)) - 1;
console.log(turnosxHS);

const intervaloMinutos = parseInt(intervaloTurno.slice(3, 5));
console.log(intervaloMinutos);

// arreglo de franja horaria
for (h = startHs; h <= limitHs; h++) {
  for (m = 0; m <= turnosxHS; m++)
    hsArray.push(
      (h<= 9 ? `0${h}` : `${h}`) +
        ":" +
        (m === 0 ? "00" : m * intervaloMinutos)
    );
}

hsArray;

// ajustar el inicio del arreglo

hsArray = hsArray.slice(hsArray.indexOf(startString));

hsArray;

// ajustar el fin del arreglo
hsArray = hsArray.slice(0, hsArray.indexOf(limitString));

hsArray;

arrFinal = []
hsArray.map((num) => {arrFinal.push({[num]:simultAppointment})})
console.log(arrFinal)