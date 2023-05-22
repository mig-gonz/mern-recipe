import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Recipes from "./components/recipes";
import Editrecipe from "./components/editRecipe";
import RecipeContext from "./context/recipeContext";
import RecipeContainer from "./components/recipeContainer";
import Navigation from "./components/navigation";
import Home from "./components/home";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4005/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="main">
      <Router>
        <RecipeContext.Provider value={{ recipes, setRecipes }}>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipeContainer />} />
              <Route path="/edit/:id" element={<Editrecipe />} />
            </Routes>
          </main>
        </RecipeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
