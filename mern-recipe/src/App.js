import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Recipes from "./components/recipes";

function App() {
  return (
    <div>
      <Router>
        <header>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
        </header>
        <main>
          <Routes>
            <Route path="/" />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
