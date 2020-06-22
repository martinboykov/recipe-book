const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Date

  type Query {
    getRecipes: RecipesResponse!
    getRecipe(_id: ID!): RecipeResponse!
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

  schema {
    query: Query
  }
`);
