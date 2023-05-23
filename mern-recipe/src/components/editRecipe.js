import { useContext, useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeContext from "../context/recipeContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditRecipe() {
  // Destructuring props passed down through context
  const { recipes, setRecipes } = useContext(RecipeContext);
  // useParams is used to get the recipe id from the URL
  const { id } = useParams();
  // useNavigate is used to navigate to a page
  const navigate = useNavigate();
  // nameRef is used to get the new recipe name
  const nameRef = useRef(null);
  // contentRef is used to get the new recipe content
  const contentRef = useRef(null);

  // responsible for adding a new recipe name and content
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Find the recipe in the recipes state
    const selectedRecipe = recipes.find(
      (recipe) => recipe.recipe_id === parseInt(id)
    );

    // If a recipe is found, set the name and content
    if (selectedRecipe) {
      setName(selectedRecipe.name);
      setContent(selectedRecipe.content);
    }
  }, [id, recipes]);

  // handles the submission of a new recipe name and content
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      name: nameRef.current.value,
      content: contentRef.current.value,
    };

    // Send a PUT request to the API endpoint
    try {
      const response = await fetch(`http://localhost:4005/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      // Check the response status
      if (response.ok) {
        // Add the updated recipe to the recipes state
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.recipe_id === parseInt(id)
              ? { ...recipe, ...updatedRecipe }
              : recipe
          )
        );
        // Redirect to the Recipes page after submission
        navigate("/recipes");
      } else {
        console.log("Failed to update recipe.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "40%", margin: "auto" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Recipe</Form.Label>
        <Form.Control
          type="text"
          value={name}
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Text className="text-muted">Edit Recipe Name</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          value={content}
          ref={contentRef}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
