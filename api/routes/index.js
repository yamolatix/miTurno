const express = require("express")
const branchOfficeRoutes = require("./branchOffice")

const router = express.Router()

router.use("/branchOffice", branchOfficeRoutes)


module.exports = router