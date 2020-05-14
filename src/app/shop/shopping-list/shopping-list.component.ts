import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    new Ingredient('Ingredient 1', 10),
    new Ingredient('Ingredient 2', 7),
    new Ingredient('Ingredient 3', 3),
  ];
  constructor() {}

  ngOnInit(): void {}
  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
