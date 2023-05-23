import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import RecipeContext from "../context/recipeContext";
import Form from "react-bootstrap/Form";

export default function Recipes() {
  // useNavigate is used to navigate to a new page
  const navigate = useNavigate();
  // Destructuring props passed down through context
  const { recipes, setRecipes } = useContext(RecipeContext);
  // Responsible for adding a new recipe name and content
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    content: "",
  });

  // handles the submission of a new recipe name and content
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API endpoint
      const response = await fetch("http://localhost:4005/api/recipes", {
        method: "POST",
        // Make sure to serialize the JSON body
        headers: {
          "Content-Type": "application/json",
        },
        // Serialize the new recipe name and content
        body: JSON.stringify(newRecipe),
      });

      // Check the response status
      if (response.ok) {
        // Add the new recipe to the recipes state
        const createdRecipe = await response.json();
        setRecipes((prevRecipes) => [...prevRecipes, createdRecipe]);
        setNewRecipe({ name: "", content: "" });
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete a recipe
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the API endpoint
      const response = await fetch(`http://localhost:4005/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Recipe deleted successfully.");

        // Remove the deleted recipe from the recipes state
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.recipe_id !== id)
        );
      } else {
        console.log("Failed to delete recipe.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // navigate to specific recipe
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Fetch recipes data from the API endpoint
  useEffect(() => {
    fetch("http://localhost:4005/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
    // Update the 'recipes' state with the fetched data
  }, [setRecipes]);

  return (
    <div style={{ width: "40%", margin: "auto" }}>
      <h1>Recipe's</h1>
      <ListGroup variant="flush">
        {recipes.map((recipe, index) => (
          <ListGroup.Item key={index}>
            {recipe.name} - {recipe.content}
            <br />
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleDelete(recipe.recipe_id)}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleEdit(recipe.recipe_id)}
            >
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h1>Add Recipe</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Name:</Form.Label>
          <Form.Control
            type="text"
            value={newRecipe.name}
            id="nameInput"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            id="contentInput"
            value={newRecipe.content}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, content: e.target.value })
            }
            placeholder="Recipe Ingredients/Instructions"
          />
        </Form.Group>
        <Button variant="primary" size="sm" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
