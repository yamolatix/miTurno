const express = require("express")
const branchOfficeRoutes = require("./branchOffice")
const userRoutes = require("./users")
const appointmentRoutes = require("./appointment")
const sacarTurno = require("./sacarTurno")

const router = express.Router()

router.use("/branchOffice", branchOfficeRoutes)
router.use("/users", userRoutes)
router.use("/appointment", appointmentRoutes)
router.use("/sacarTurno", sacarTurno)

module.exports = router;

