import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shop/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shop/shopping-list-edit/shopping-list-edit.component';
import { RecipeComponent } from './recipes/recipe.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShopService } from './shop.service';
import { RecipeService } from './recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    ShopComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [ShopService, RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
