const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

/* const { getTemplate, sendEmail } = require('../config/mail.config');
const { getToken, getTokenData } = require('../config/jwt.config'); */

const schemaRegister = Joi.object({
  fname: Joi.string().min(3).max(255).required(),
  lname: Joi.string().min(2).max(255).required(),
  dni: Joi.number().integer().required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(8).max(1024).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(4).max(1024).required(),
});


router.post('/login', async(req, res) => {
    //validaciones de usuario (ingreso)
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).json({ error: true, mensaje: 'email no registrado' })

    const passValida = await bcrypt.compare(req.body.password, user.password)
    if(!passValida) return res.status(400).json({ error: true, mensaje: 'contraseña erronea'})

    //crear token
    const token = jwt.sign({
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        dni: user.dni,
        admin: user.admin,
        operator: user.operator
                      
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token},
<<<<<<< HEAD
        admin: user.admin,
        operator: user.operator,
        fname: user.fname
=======
        id: user._id,
        fname: user.fname,
        admin: user.admin,
        operator: user.operator
>>>>>>> 3d01c18d62bad53b2cf3de7841dfca0ceda135e7
    })
});

router.post("/register", async (req, res) => {
  //validaciones de usuarios (registro)
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const existeEmail = await User.findOne({ email: req.body.email });
  if (existeEmail) {
    return res
      .status(400)
      .json({ error: true, mensaje: "email esta registrado" });
  }

  //hash contraseña
  const saltos = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltos);

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    dni: req.body.dni,
    email: req.body.email,
    password: password,
  });

  // Generar token
  //const token = getToken(req.body.email);

  // obtener data del token

  /* const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, 'TOKEN_SECRET', (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else {
            data = decoded;
        }
    });
    return data
  } */

  // Obtener un template
  //const template = getTemplate(user.fname, token);

  try {
    const userDB = await user.save();
    //console.log('MAIL DE DESTINO ', user.email)
    //console.log('MAIL DE DESTINO ', template)
      // Enviar el email
    //await sendEmail(user.email, 'Aviso: registro exitoso', template);
    res.json({
      success: true,
      msg: 'Registrado correctamente',
      error: null,
      data: userDB,
    });

  
    }catch(error) {
        res.status(400).json(error)
    }
   

});


module.exports = router;
