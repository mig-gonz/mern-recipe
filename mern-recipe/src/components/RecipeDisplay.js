import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function RecipeDisplay() {
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipeId = searchParams.get("recipeId");
    const recipeData = location.state?.recipe;

    setRecipe(recipeData);
  }, [location.state]);

  console.log("Recipe Display - recipe:", recipe);

  if (!recipe || !recipe.analyzedInstructions) {
    return <div>No recipe data available</div>;
  }
  return (
    <div>
      <h1>Spoon Recipes</h1>
      <Row>
        <Col md={6}>
          <h2>Steps</h2>
          <ol>
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </Col>
        <Col md={6}>
          <h2>Ingredients</h2>
          <ul>
            {recipe.analyzedInstructions[0].steps.map((step) =>
              step.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))
            )}
          </ul>
        </Col>
      </Row>
    </div>
  );
}
