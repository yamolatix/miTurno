const {Router} = require("express")
const router = Router()
const User = require("../models/User")
const sendEmail = require("../utils/sendEmail")
const Joi = require("Joi")
const bcrypt = require("bcrypt")

//send password link