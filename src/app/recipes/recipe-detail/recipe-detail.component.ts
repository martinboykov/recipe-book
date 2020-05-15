import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ShopService } from 'src/app/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;
  constructor(
    private recipeService: RecipeService,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
  sendIngredients(ingredients) {
    ingredients.forEach((ingredient) => {
      this.shopService.addIngredient(ingredient);
    });
    this.shopService.updateIngredients();
    this.router.navigate(['/shopping-list']);
  }
}
