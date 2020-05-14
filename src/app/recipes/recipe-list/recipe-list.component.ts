import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent  {
  @Input()recipes: Recipe[];
  @Output() selectedRecipe = new EventEmitter();


  constructor() {}

  onRecipeSelected(recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
