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

recipes.post("/", async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      name: req.body.name,
      content: req.body.content,
    });
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

recipes.delete("/:recipe_id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.destroy({
      where: {
        recipe_id: req.params.recipe_id,
      },
    });
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

recipes.put("/:recipe_id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.update(
      {
        name: req.body.name,
        content: req.body.content,
      },
      {
        where: {
          recipe_id: req.params.recipe_id,
        },
      }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

module.exports = recipes;
