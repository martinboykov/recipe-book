import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  recipes = [
    new Recipe(
      'Recipe 1',
      'Some test description1',
      './assets/images/meat-4813261_1280.jpg'
    ),
    new Recipe(
      'Recipe 2',
      'Some test description2',
      './assets/images/kagyana-2955466_1280.jpg'
    ),
  ];
  recipeSelected = false;
  constructor() {}
  ngOnInit(): void {}
  onRecipeSelected(recipe) {
    this.recipe = recipe;
    this.recipeSelected = true;
  }
}
