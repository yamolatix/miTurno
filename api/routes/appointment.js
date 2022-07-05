const { Router } = require("express");
const router = Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");

//Crear un nuevo turno  -> create and save. Put use updateOne
router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("***USER ID***", userId);
  const { date, month, year, day, time } = req.body;
  const branchOfficeId = req.body._id;

  const newAppointment = new Appointment({
    date,
    month,
    year,
    day,
    time,
  });

  try {

/*
const turnosTomados = Appointment.count({day:02})
if(simultAppointment === 1){
    if(turnosTomados==simultAppointment){
        no hay turno disponible
    }
    else {
        crear el turno
    }
  }


if(simultAppointment > 1){
    if(turnosTomados==simultAppointment){
        no hay turno disponible
    }
    else {
        crear el turno
    }
}

    1) No hay turnos simultaneos -> no hay turno disponible
    2) Hay turnos simultaneos -> 1
     2.1) consultaTurnos >= simultAppointment -> GRIS
     2.2) consultaTurnos < simultAppointment


     2 personas atiendose

     0 - 1 turno en simultaneo
     1 - 2 personas en simultaneo

     2 = 2 igual

}

*/
    const saveAppointment = await newAppointment.save();
    res.json({ error: null, data: saveAppointment });
  } catch (error) {
    res.status(404).json(error);
  }


//   async function update_subscription_status(id) {
//     await User.updateOne(
//       { chat_id: id },
//       [ { "$set": { "mailing": { "$eq": [false, "$mailing"] } } } ]
//     )
// }


  
  //   console.log("***ID DE LA SUCURSAL***", branchOfficeId);
  //   Appointment.updateOne(
  //     { userId },
  //     { $set: { date, hour, id } },
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.json({ error: err });
  //       } else {
  //         res.json({ data: result });
  //       }
  //     }
  //   );
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
