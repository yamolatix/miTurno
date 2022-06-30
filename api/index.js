const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const routes = require("./routes/index")
const cors = require("cors")
const authRoutes = require('./routes/auth')
const validaToken = require('./routes/validate-token')
const admin = require('./routes/admin')


//para que funcione el .env
require("dotenv").config();

const PORT = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

//const cookieParser = require("cookie-parser")
const app = express ()

//permiso cors
app.use(cors());

//capturar body
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.json())

//conexion a base de datos mongo_Atlas
mongoose
  .connect("mongodb://localhost/turnon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(err));

//import routes
app.use("/api/user", authRoutes)
app.use("/api", routes)
app.use("/api/admin",validaToken, admin )


//route middlewares
app.use(morgan("tiny"));
app.get("/", (req,res) => {
  res.json({
    estado:true,
    mensaje: "funciona!"
  })
})

app.listen(PORT, ()=> {
  console.log(`servidor online en: ${PORT}`)
})