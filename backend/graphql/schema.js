
const { buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Query {
    getRecipes: RecipesResponse!
    getRecipe(input: ID!): RecipeResponse!
  }

  type Mutation {
    addRecipe(input: NewRecipeInput!): RecipeResponse!
  }
  input NewRecipeInput {
    name: String!
    description: String!
    imagePath: String!
    ingredients: [IngredientInput!]!
  }

  type RecipesResponse {
    message: String!
    data: [Recipe]
  }
  type RecipeResponse {
    message: String!
    data: Recipe
  }


  type Recipe {
    _id: ID!
    name: String!
    description: String!
    imagePath: String!
    ingredients: [Ingredient]!
    dateCreated: Date!
  }
  type Ingredient {
    name: String!
    amount: Float!
  }
  input IngredientInput {
    name: String!
    amount: Float!
  }
`;
