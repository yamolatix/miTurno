const express = require("express")
const branchOfficeRoutes = require("./branchOffice")
const userRoutes = require("./users")
const appointmentRoutes = require("./appointment")
const availableAppointment = require("./availableAppointment")
const auth = require("./auth")

const router = express.Router()

router.use("/branchOffice", branchOfficeRoutes)
router.use("/users", userRoutes)
router.use("/appointment", appointmentRoutes)
router.use("/availableAppointment", availableAppointment)

module.exports = router;

