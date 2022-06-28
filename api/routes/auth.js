const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Joi = require("@hapi/joi")

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required()
})

router.post('/register', async(req, res) => {
    //validaciones de usuarios
    const { error } = schemaRegister.validate(req.body)
    if(error){return res.status(400).json({error: error.details[0].message})}

    const existeEmail = await User.findOne({email: req.body.email})
    if(existeEmail){return res.status(400).json({error: true, mensaje: 'el email ya esta registrado'})}
    
    //hash contraseña
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })

    // await User.create(user);
    // res.send("User Created)");
    }catch(error) {
        res.status(400).json(error)
    }
   
})

module.exports = router;
