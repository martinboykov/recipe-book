import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shop/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes = [
    new Recipe(
      'Recipe 1',
      'Some test description1',
      './assets/images/meat-4813261_1280.jpg',
      [
        new Ingredient('Ingredient 1', 10),
        new Ingredient('Ingredient 2', 7),
        new Ingredient('Ingredient 3', 3),
      ]
    ),
    new Recipe(
      'Recipe 2',
      'Some test description2',
      './assets/images/kagyana-2955466_1280.jpg',
      [
        new Ingredient('Ingredient 1', 3),
        new Ingredient('Ingredient 4', 2),
        new Ingredient('Ingredient 5', 8),
      ]
    ),
  ];
  constructor() {}
  getRecipes() {
    return this.recipes.slice();
  }

}
