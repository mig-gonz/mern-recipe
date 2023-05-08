import { useState, useEffect } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4005/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            {recipe.name} {recipe.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
