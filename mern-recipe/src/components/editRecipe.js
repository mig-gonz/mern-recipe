import { useContext, useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeContext from "../context/recipeContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditRecipe() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const selectedRecipe = recipes.find(
      (recipe) => recipe.recipe_id === parseInt(id)
    );

    if (selectedRecipe) {
      setName(selectedRecipe.name);
      setContent(selectedRecipe.content);
    }
  }, [id, recipes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      name: nameRef.current.value,
      content: contentRef.current.value,
    };

    try {
      const response = await fetch(`http://localhost:4005/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.recipe_id === parseInt(id)
              ? { ...recipe, ...updatedRecipe }
              : recipe
          )
        );
        navigate("/recipes"); // Redirect to the Recipes page after submission
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
