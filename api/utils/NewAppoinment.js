const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const parseId = require("../utils/functions");

const NewAppointment = async (branchOfficeId, userId, saveAppointmentId, done) => {
 // ID MESSI(CLIENTE): I62c8256b3f93b0d3b2d46cb
 // Tomo turno nuevo - cambios en collection BrandOffice
 const updateBranchOffice = await BranchOffice.updateOne(
   { _id: branchOfficeId },
   { $push: { appointment: parseId(saveAppointmentId) } }
 ).populate("branchOffice");

 // Tomo turno nuevo - cambios en collection User
 const updateUser = await User.updateOne(
   { _id: userId },
   {
     $push: {
       appointment: parseId(saveAppointmentId),
       state: "reservado",
     },
   }
 ).populate("user");

 // Tomo turno nuevo - cambios en collection Appoinment
 await Appointment.findOneAndUpdate(
   { _id: parseId(saveAppointmentId) },
   [{ $set: { available: { $eq: [false, "$available"] } } }]
 );
 await Appointment.findOneAndUpdate(
   { _id: parseId(saveAppointmentId) },
   [{ $set: { state: "reservado" } }]
 )
 return done()}

 module.exports = NewAppointment;