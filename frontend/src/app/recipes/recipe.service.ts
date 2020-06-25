import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe, GetRecipesQuery, GetRecipeQuery } from './recipe.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotificationService } from '../logging/notification.service';
import { tap, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesUpdated = new BehaviorSubject<Recipe[]>(null);
  recipes: Recipe[] = [];
  recipe: Recipe;
  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private notifier: NotificationService
  ) {}

  getRecipes() {
    // this.http
    //   .get(BACKEND_URL + 'recipes/')
    //   .subscribe((response: { message: string; data: Recipe[] }) => {
    //     this.recipes = [...response.data];
    //     this.updatedRecipes();
    //   });
    this.apollo
      .watchQuery({
        query: GetRecipesQuery,
      })
      .valueChanges.pipe(map((result: any) => result.data.recipes))
      .subscribe((result: any) => {
        this.recipes = [...result.data];
        this.updatedRecipes();
      });
  }
  getRecipe(_id) {
    // return this.http.get(BACKEND_URL + 'recipes/' + _id);
    console.log(_id);

    return this.apollo
      .watchQuery({
        query: GetRecipeQuery,
        variables: { recipeId: _id },
      })
      .valueChanges.pipe(map((result: any) => result.data.recipe));
    // .subscribe((result: any) => {
    //   this.recipes = [...result.data];
    //   this.updatedRecipes();
    // });
  }
  addRecipe(newRecipe: Recipe) {
    const recipe = new Recipe(
      newRecipe.name,
      newRecipe.description,
      newRecipe.imagePath,
      newRecipe.ingredients
    );
    this.http.post(BACKEND_URL + 'recipes', recipe).subscribe((response) => {
      this.getRecipes();
      this.notifier.showSuccess('Recipe was added successfully');
    });
  }
  editRecipe(upRecipe: Recipe) {
    return this.http
      .put(BACKEND_URL + 'recipes/' + upRecipe._id, upRecipe)
      .pipe(
        tap((response: { message: string; data: Recipe }) => {
          this.recipes.forEach((r) => {
            if (r._id === upRecipe._id) {
              Object.assign(r, response.data);
            }
            this.updatedRecipes();
            this.notifier.showSuccess('Recipe was updated successfully');
          });
        })
      );
  }
  deleteRecipe(_id: string) {
    this.http.delete(BACKEND_URL + 'recipes/' + _id).subscribe((response) => {
      this.getRecipes();
      this.notifier.showSuccess('Recipe was deleted successfully');
    });
  }
  updatedRecipes() {
    this.recipesUpdated.next(this.recipes.slice());
  }
}
