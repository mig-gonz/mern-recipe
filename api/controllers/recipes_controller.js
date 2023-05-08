const recipes = require("express").Router();
const db = require("../models");
const { Recipe } = db;

recipes.get("/", async (req, res) => {
  try {
    const foundRecipes = await Recipe.findAll();
    res.status(200).json(foundRecipes);
  } catch (err) {
    res.status(500).json("Server errror");
    console.log(err);
  }
});

module.exports = recipes;
