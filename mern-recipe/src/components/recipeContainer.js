import RecipeContext from "../context/recipeContext";
import Recipes from "./recipes";
export default function RecipeContainer() {
  return (
    <RecipeContext.Consumer>
      {({ recipes, setRecipes }) => (
        <Recipes recipes={recipes} setRecipes={setRecipes} />
      )}
    </RecipeContext.Consumer>
  );
}
