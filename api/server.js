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
app.use(express.static(path.join(__dirname, "../mern-recipe/build")));

// CONTROLLERS
const recipesController = require("./controllers/recipes_controller");
app.use("/api/recipes", recipesController);

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../mern-recipe/build/index.html"));
});
