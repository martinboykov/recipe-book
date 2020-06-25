import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShopService } from 'src/app/shop/shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingUpdateSubscription: Subscription;
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();
    this.ingUpdateSubscription = this.shopService.ingredientsUpdated.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  selectIngredient(ing){
    this.shopService.onSelectedIngredient(ing);
  }
  ngOnDestroy() {
    this.ingUpdateSubscription.unsubscribe();
  }
}
