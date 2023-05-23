# MERN STACK Recipe App

## FlavorHub

My mern stack FlavorHub recipe app will be a portfolio project and for full stack app build practice. My redcipe app
will have full crud capabilities, Creating, Deleting, and Editing recipes.

#### Components

- HomePage - a brief introduction with a continue to app button.
- Gallery - this component will act as a container for ourt recipes.
- GalleryItem - this component will contain all recipe data and each recipe will be clickable.
- RecipeView - this component will display a full view on clicked recipe displaying additional data. And 2 buttons, 1 for editing and another for deleting selecting recipes.
- NavBar - this component will hold our app name, aswell as a create recipe button.

#### Packages

react-router-dom
cors
dotenv
express
pg
pg-hstore
sequelize

#### State Management

recipeList state: array[], to manage our recipe

### Recipe Database

I will be utilizing supabase for our Database.

| Field   | Type   |
| ------- | ------ |
| name    | String |
| content | Text   |

#### Routes

| Method | Path | Purpose |
| ------ | ---- | ------- |
