import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  Recipe,
  GetRecipesQuery,
  GetRecipeQuery,
  AddRecipeMutation,
  NewRecipeInput,
  Response,
} from './recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotificationService } from '../logging/notification.service';
import { tap, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

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
    private notifier: NotificationService,
    private router: Router,
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.apollo
      .watchQuery<Recipe[]>({
        query: GetRecipesQuery,
      })
      .valueChanges.pipe(
        map((result: any) => result.data.getRecipes),
        tap((result: any) => (this.recipes = [...result.data])),
        tap(() => this.updatedRecipes())
      );
  }
  getRecipe(_id): Observable<Recipe> {
    return this.apollo
      .watchQuery<Recipe>({
        query: GetRecipeQuery,
        variables: { recipeId: _id },
      })
      .valueChanges.pipe(
        map((result: any) => result.data.getRecipe),
        map((result: any) => result.data)
      );
  }
  addRecipe(recipeInput: NewRecipeInput) {
    const recipe = {
      name: recipeInput.name,
      description: recipeInput.description,
      imagePath: recipeInput.imagePath,
      ingredients: recipeInput.ingredients,
    };
    this.apollo
      .mutate({
        mutation: AddRecipeMutation,
        variables: { newRecipe: recipe },
      })
      .pipe(map((response: any) => response.data.addRecipe))
      .subscribe((result: Response) => {
        const id = result.data._id;
        this.getRecipes();
        this.notifier.showSuccess(result.message);
        this.router.navigate(['/recipe-book', id]);
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
