const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const routes = require("./routes/index");
const authRoutes = require('./routes/auth');

// Para que funcione el .env
require("dotenv").config();

// Constantes traidas del .env
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://turnon_admin:1234@cluster0.0ywn3.mongodb.net/turnon?retryWrites=true&w=majority;"

const app = express();

//Permiso cors
var corsOptions = {
  origin: '*', // reemplazar con dominio
  optionSuccessStatus:200
};
app.use(cors(corsOptions));

//capturar body
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.json());

// Conexion a base de datos MongoDB Atlas 
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => console.log("database is connected to mongodb_atlas"))
  .catch((err) => console.log(err));

// Importo routes
app.use("/api/user", authRoutes);
app.use("/api", routes);

// Route middlewares
app.use(morgan("tiny"));

app.listen(PORT, ()=> {
  console.log(`servidor online en: ${PORT}`)
});