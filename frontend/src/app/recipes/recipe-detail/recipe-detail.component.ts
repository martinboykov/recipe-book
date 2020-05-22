import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ShopService } from 'src/app/shop.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ingredient } from 'src/app/shop/ingredient.model';
import { Subscription, of } from 'rxjs';
import { concatMap  } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeIndex: number;
  _id: string;
  recipesUpdateSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private shopService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        concatMap((params: ParamMap) => {
          this._id = params.get('_id');
          if (this._id) {
            return this.recipeService.getRecipe(this._id);
          }
          return of([]);
        })
      )
      .subscribe((res: { msg: string; data: Recipe }) => {
        this.recipe = res?.data;
      });
  }
  sendIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.shopService.addIngredient(ingredient);
    });
    this.shopService.updateIngredients();
    this.router.navigate(['shopping-list']);
  }
  delRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id);
    this.router.navigate(['recipe-book']);
  }
  ngOnDestroy() {}
}
