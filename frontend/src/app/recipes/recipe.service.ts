import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotificationService } from '../logging/notification.service';
import { tap } from 'rxjs/operators';
const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesUpdated = new BehaviorSubject<Recipe[]>(null);
  recipes: Recipe[] = [];
  recipe: Recipe;
  constructor(
    private http: HttpClient,
    private notifier: NotificationService
  ) {}

  getRecipes() {
    this.http
      .get(BACKEND_URL + 'recipes/')
      .subscribe((response: { message: string; data: Recipe[] }) => {
        this.recipes = [...response.data];
        this.updatedRecipes();
      });
  }
  getRecipe(_id: string) {
    return this.http.get(BACKEND_URL + 'recipes/' + _id);
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
