const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const routes = require("./routes")
const db= require("./db/index")

const app = express ()

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api", routes)
const PORT = 3001
app.listen(PORT, ()=>{console.log(`Listenning on port ${PORT}`)})