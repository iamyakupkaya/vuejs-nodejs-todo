//Import Build
const dotenv = require("dotenv").config(); // config dememizin sebebsi proccess.env dediğimizde direkt ulaşabilmek
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const todoRouter = require("./src/routers/todoRouter");
require("./src/configs/database"); // database connection

//const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", todoRouter);

//Listen...
app.listen(process.env.PORT, (_) => console.log("Server is listening... Connection right :)"));

