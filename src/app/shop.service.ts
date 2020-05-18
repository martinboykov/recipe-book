import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './shop/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  @Output() ingredientsUpdated = new EventEmitter<Ingredient[]>();
  ingredients = [
    // new Ingredient('Ingredient 1', 10),
    // new Ingredient('Ingredient 2', 7),
    // new Ingredient('Ingredient 3', 3),
  ];
  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(newIngredient: Ingredient) {
    let ingExist = false;
    this.ingredients.forEach((ingredient) => {
      if (ingredient.name === newIngredient.name) {
        ingredient.amount += newIngredient.amount;
        ingExist = true;
      }
    });
    if (!ingExist) {
      this.ingredients.push(
        new Ingredient(newIngredient.name, newIngredient.amount)
      );
    }
    this.updateIngredients();
  }
  deleteIngredient(name, amount) {
    let index = null;
    this.ingredients.forEach((ingredient, i) => {
      if (name === ingredient.name) {
        ingredient.amount -= amount;
        index = i;
      }
    });
    if (index && this.ingredients[index].amount <= 0) {
      this.ingredients.splice(index, 1);
    }
    this.updateIngredients();
  }
  updateIngredients() {
    this.ingredientsUpdated.emit(this.getIngredients());
  }
}
