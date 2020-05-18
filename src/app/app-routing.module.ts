import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shop/shopping-list/shopping-list.component';
import { RecipeComponent } from './recipes/recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
  {
    path: 'recipe-book',
    component: RecipeComponent,
    children: [
      { path: '', component: RecipeDetailComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: 'shopping-list' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })], // <-- debugging purposes only)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
