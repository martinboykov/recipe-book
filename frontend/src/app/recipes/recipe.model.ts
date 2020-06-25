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
export interface NewRecipeInput {
  _id?: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}

export interface Response {
  message: string;
  data: any;
}

export const GetRecipesQuery = gql`
  query GetRecipes {
    getRecipes {
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
    getRecipe(input: $recipeId) {
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

export const AddRecipeMutation = gql`
  mutation AddRecipe($newRecipe: NewRecipeInput!) {
    addRecipe(input: $newRecipe) {
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
export const UpdateRecipeMutation = gql`
  mutation updateRecipe($updatedRecipe: NewRecipeInput!) {
    editRecipe(input: $updatedRecipe) {
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
export const DeleteRecipeMutation = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(input: $id) {
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
