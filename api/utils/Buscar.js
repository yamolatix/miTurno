const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");

const Buscar = (date, month, year, day, time, branchOfficeId, done) => {
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
      })
      return done()
    };
  
  
  module.exports = Buscar
  