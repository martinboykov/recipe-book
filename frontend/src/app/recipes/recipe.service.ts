import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  Recipe,
  GetRecipesQuery,
  GetRecipeQuery,
  AddRecipeMutation,
  Response,
  NewRecipeInput,
  UpdateRecipeMutation,
  DeleteRecipeMutation,
} from './recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotificationService } from '../logging/notification.service';
import { tap, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
        this.notifier.showSuccess(result.message);
        this.router.navigate(['/recipe-book', id]);
      });
  }
  // public updateOwner = (ownerToUpdate: OwnerInputType, id: string) => {
  //   this.apollo
  //     .mutate({
  //       mutation: gql`
  //         mutation($owner: ownerInput!, $ownerId: ID!) {
  //           updateOwner(owner: $owner, ownerId: $ownerId) {
  //             id
  //             name
  //             address
  //           }
  //         }
  //       `,
  //       variables: { owner: ownerToUpdate, ownerId: id },
  //     })
  //     .subscribe((result) => {
  //       this.updatedOwner = result.data as OwnerType;
  //     });
  // };
  editRecipe(upRecipe: NewRecipeInput) {
    const recipe = {
      _id: upRecipe._id,
      name: upRecipe.name,
      description: upRecipe.description,
      imagePath: upRecipe.imagePath,
      ingredients: upRecipe.ingredients,
    };
    this.apollo
      .mutate({
        mutation: UpdateRecipeMutation,
        variables: { updatedRecipe: upRecipe },
      })
      .pipe(
        map((response: any) => response.data.editRecipe),
        tap((response: Response) => {
          this.recipes.forEach((r) => {
            if (r._id === upRecipe._id) {
              Object.assign(r, response.data);
            }
            this.updatedRecipes();
          });
        })
      )
      .subscribe((response: Response) => {
        const id = response.data._id;
        this.notifier.showSuccess(response.message);
        this.router.navigate(['/recipe-book', id]);
      });
  }
  deleteRecipe(_id: string) {
    this.apollo
      .mutate({
        mutation: DeleteRecipeMutation,
        variables: { id: _id },
      })
      .pipe(map((response: any) => response.data.deleteRecipe))
      .subscribe((response: Response) => {
        console.log(response);
        this.recipes = this.recipes.filter(
          (recipe) => recipe._id !== response.data._id
        );
        this.updatedRecipes();
        this.notifier.showSuccess(response.message);
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
  updatedRecipes() {
    this.recipesUpdated.next(this.recipes.slice());
  }
}
