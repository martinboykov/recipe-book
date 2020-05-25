import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShopComponent } from './shop/shop.component';
import { ShoppingListComponent } from './shop/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shop/shopping-list-edit/shopping-list-edit.component';

import { RecipeComponent } from './recipes/recipe.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { ShopService } from './shop.service';
import { RecipeService } from './recipe.service';
import { GlobalErrorHandler } from './error-handling/global-error-handler';
import { ServerErrorInterceptor } from './error-handling/server-error.interceptor';
import { LoggingInterceptor } from './logging/logging-interceptor';

import { ToastrModule } from 'ngx-toastr';


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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      maxOpened: 3,
      countDuplicates: true,
      preventDuplicates: true,
    }),
  ],
  providers: [
    ShopService,
    RecipeService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true, // multi : true -> dont overwrite existing interceptors
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
