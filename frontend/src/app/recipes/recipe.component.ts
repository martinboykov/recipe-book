import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipes: Recipe[];
  recipesUpdateSubscription: Subscription;

  recipeSelected = false;
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.recipesUpdateSubscription = this.recipeService.recipesUpdated.subscribe(
      (recipes) => {
        this.recipes = recipes;
        console.log(this.recipes);
      }
    );
    console.log('RecipeComponent created');
  }
  showRecipeDetails(recipe) {
    this.recipe = recipe;
    this.recipeSelected = true;
  }
  ngOnDestroy() {
    this.recipesUpdateSubscription.unsubscribe();
  }
}
