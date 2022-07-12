const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const parseId = require("./functions")

const Cancelar = async (appointmentId) => {
  await Appointment.findOneAndUpdate({ _id: parseId(appointmentId) }, [
    { $set: { available: { $eq: [false, "$available"] } } },
  ]);
  const appointmentCanceled = await Appointment.findOneAndUpdate(
    { _id: parseId(appointmentId) },
    [{ $set: { state: "cancelado" } }]
  );
  return
}

module.exports = Cancelar;