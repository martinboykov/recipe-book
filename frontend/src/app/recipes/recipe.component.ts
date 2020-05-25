import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesUpdateSubscription: Subscription;
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.recipesUpdateSubscription = this.recipeService.recipesUpdated.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy() {
    this.recipesUpdateSubscription.unsubscribe();
  }
}
