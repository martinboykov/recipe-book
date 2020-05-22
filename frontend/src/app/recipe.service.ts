import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shop/ingredient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesUpdated = new BehaviorSubject<Recipe[]>(null);
  recipes = [
    new Recipe(
      'Recipe 1',
      'Some test description1',
      './assets/images/meat-4813261_1280.jpg',
      [
        new Ingredient('Ingredient 1', 10, 1),
        new Ingredient('Ingredient 2', 7, 2),
        new Ingredient('Ingredient 3', 3, 3),
      ],
      1
    ),
    new Recipe(
      'Recipe 2',
      'Some test description2',
      './assets/images/kagyana-2955466_1280.jpg',
      [
        new Ingredient('Ingredient 1', 3, 1),
        new Ingredient('Ingredient 4', 2, 4),
        new Ingredient('Ingredient 5', 8, 5),
      ],
      2
    ),
  ];
  constructor() {}
  getRecipes() {
    const recipes = this.recipes.slice();
    this.updatedRecipes();
    return recipes;
  }
  getRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }
  addRecipe(newRecipe: Recipe) {
    const recipe = new Recipe(
      newRecipe.name,
      newRecipe.description,
      newRecipe.imagePath,
      newRecipe.ingredients
    );
    this.recipes.push(recipe);
    this.updatedRecipes();
  }
  updateRecipe(upRecipe: Recipe) {
    const recipe = this.recipes.find((r) => r.id === upRecipe.id);
    Object.assign(recipe, upRecipe);
    this.updatedRecipes();
  }
  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    this.recipes.splice(index, 1);
    this.updatedRecipes();
  }
  updatedRecipes() {
    this.recipesUpdated.next(this.recipes.slice());
  }
}
