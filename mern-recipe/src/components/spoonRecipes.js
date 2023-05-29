import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeDisplay from "./RecipeDisplay";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function SpoonRecipes() {
  const navigate = useNavigate();
  const [spoonRecipes, setSpoonRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const apiKey = "4a531ae70fae47029640645667f40aa4";

  const searchRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&addRecipeInformation=true`;

  const handleClick = (recipe) => {
    navigate(`/RecipeDisplay?recipeId=${recipe.id}`, { state: { recipe } });
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetch(searchRecipe)
        .then((res) => res.json())
        .then((data) => {
          setSpoonRecipes(data.results);
        });
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Spoon Recipes</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={handleSearch}>Search</button>
      <Row xs={1} md={2} className="g-1">
        {spoonRecipes.map((recipe) => (
          <Col key={recipe.id} xs={12} md={6} lg={3}>
            <Card style={{ height: "100%" }}>
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Button
                  onClick={() => handleClick(recipe)}
                  variant="primary"
                  style={{ backgroundColor: "#123456" }}
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
