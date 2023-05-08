//DEPENDENCIES
const express = require("express");
const app = express();
const { sequelize } = require("sequelize");
const path = require("path");
const cors = require("cors");

// CONFIUGURATION / MIDDLEWARE
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CONTROLLERS
const recipesController = require("./controllers/recipes_controller");
app.use("/api/recipes", recipesController);

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
