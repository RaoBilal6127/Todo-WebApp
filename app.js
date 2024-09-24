const express = require("express");
const connectmongodb = require("./init/mongodb");
const todoRoutes = require("./routes/todo");
const path = require("path");

//init app
const app = express();
const bodyParser = require("body-parser");
//mongdb connection
connectmongodb();

//view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", todoRoutes);

module.exports = app;