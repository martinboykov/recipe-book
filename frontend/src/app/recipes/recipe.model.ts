import { Ingredient } from '../shop/ingredient.model';
import gql from 'graphql-tag';

export class Recipe implements RecipeI {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public _id?: string
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

export interface RecipeI {
  _id?: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}

export interface AllRecipesQueryResponse {
  recipes: Recipe[];
}

export interface RecipesDetailQueryResponse {
  recipes: Recipe;
}

export const GetRecipesQuery = gql`
  query GetRecipes {
    recipes {
      message
      data {
        _id
        name
        description
        imagePath
        ingredients {
          name
          amount
        }
      }
    }
  }
`;

export const GetRecipeQuery = gql`
  query GetRecipe($recipeId: ID!) {
    recipe(_id: $recipeId) {
      message
      data {
        _id
        name
        description
        imagePath
        ingredients {
          name
          amount
        }
      }
    }
  }
`;
