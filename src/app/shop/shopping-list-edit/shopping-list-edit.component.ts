import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShopService } from 'src/app/shop.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {}

  add(data) {
    const newIngredient = new Ingredient(data.name.value, data.amount.value);
    this.shopService.addIngredient(newIngredient);
  }
  delete(name, amount) {
    this.shopService.deleteIngredient(name.value, amount.value);
  }
}
