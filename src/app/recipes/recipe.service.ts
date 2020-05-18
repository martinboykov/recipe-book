import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Router } from '@angular/router';
import { Recipes } from './mock-recipes';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes = Recipes;
  constructor(private router: Router) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number): Recipe {
    const recipe = this.recipes.filter((r: Recipe) => {
      console.log(r.id, id);

      return r.id === id;
    });
    console.log(recipe);
    if (recipe.length > 0) {
      console.log(recipe[0]);

      return recipe[0];
    }
    this.router.navigate(['/']);
  }
}
