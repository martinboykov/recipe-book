
const { buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Query {
    recipes: RecipesResponse!
    recipe(_id: ID!): RecipeResponse!
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
    amount: Int!
  }
`;
