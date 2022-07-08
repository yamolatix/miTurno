const express = require("express")
const branchOfficeRoutes = require("./branchOffice")
const userRoutes = require("./users")
const appointmentRoutes = require("./appointment")

const router = express.Router()

router.use("/branchOffice", branchOfficeRoutes)
router.use("/users", userRoutes)
router.use("/appointment", appointmentRoutes)

module.exports = router;

