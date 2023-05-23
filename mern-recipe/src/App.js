import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Editrecipe from "./components/editRecipe";
import RecipeContext from "./context/recipeContext";
import RecipeContainer from "./components/recipeContainer";
import Navigation from "./components/navigation";
import Home from "./components/home";

function App() {
  // Manages our recipe's state
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // This callback function runs when the component mounts

    // Fetch recipes data from the API endpoint
    fetch("http://localhost:4005/api/recipes")
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => setRecipes(data)); // Update the 'recipes' state with the fetched data
  }, []);

  return (
    <div className="main">
      <Router>
        {/* useContect to pass props to child components */}
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
