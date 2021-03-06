import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipes/recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShopComponent } from './shop/shop.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { NotFoundComponent } from './error-handling/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  {
    path: 'recipe-book',
    component: RecipeComponent,
    children: [
      { path: '', component: RecipeListComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':_id', component: RecipeDetailComponent },
      { path: ':_id/edit', component: RecipeEditComponent },
    ],
  },

  { path: 'shopping-list', component: ShopComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })], // <-- debugging purposes only)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
