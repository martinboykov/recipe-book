import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShopService } from 'src/app/shop.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    console.log('ShoppingListComponent created');

    this.ingredients = this.shopService.getIngredients();
    this.shopService.ingredientsUpdated.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
}
