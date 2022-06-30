const express = require("express")
const branchOfficeRoutes = require("./branchOffice")
const userRoutes = require("./users")

const router = express.Router()

router.use("/branchOffice", branchOfficeRoutes)
router.use("/users", userRoutes)


module.exports = router