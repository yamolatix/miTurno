const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const routes = require("./routes")
const cors = require("cors")
const authRoutes = require('./routes/auth')

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
// //conexion a base de datos mongoDB local
// mongoose
// .connect("mongodb://localhost/turnon", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("database is connected"))
// .catch((err) => console.log(err));

//conexion a base de datos mongo_Atlas
mongoose
.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB_atlas is connected"))
.catch((err) => console.log("ERROR Not connected: ", err));

//import routes
app.use("/api/user", authRoutes)
app.use("/api", routes)

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