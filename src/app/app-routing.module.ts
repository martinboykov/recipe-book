import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shop/shopping-list/shopping-list.component';
import { RecipeComponent } from './recipes/recipe.component';

const appRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
  { path: 'recipe-book', component: RecipeComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: 'recipe-book' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })], // <-- debugging purposes only)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
