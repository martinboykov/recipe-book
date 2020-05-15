import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  recipes: Recipe[];
  recipeSelected = false;
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    console.log('RecipeComponent created');
  }
  showRecipeDetails(recipe) {
    this.recipe = recipe;
    this.recipeSelected = true;
  }
}
