import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
    this.recipesUpdateSubscription = this.recipeService
      .getRecipes()
      .subscribe();
  }
  ngOnDestroy() {
    this.recipesUpdateSubscription.unsubscribe();
  }
}
