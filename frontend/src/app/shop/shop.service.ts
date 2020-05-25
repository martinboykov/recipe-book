import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<Ingredient>();
  ingredients = [];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(newIngredient: Ingredient) {
    const index = this.ingredients.findIndex((ingredient) => {
      return ingredient.name === newIngredient.name;
    });
    if (index < 0) {
      if (newIngredient.amount <= 0) {
        return;
      }
      this.ingredients.push(
        new Ingredient(newIngredient.name, newIngredient.amount)
      );
    } else {
      const ingredient = this.ingredients[index];
      if (newIngredient.amount + ingredient.amount > 0) {
        ingredient.amount += newIngredient.amount;
      } else {
        return this.deleteIngredient(ingredient);
      }
    }
    this.updateIngredients();
  }
  updateIngredient(upIngredient: Ingredient, oldIngredient: Ingredient) {
    if (upIngredient.amount <= 0) {
      return this.deleteIngredient(upIngredient);
    } else {
      oldIngredient.amount = upIngredient.amount;
      oldIngredient.name = upIngredient.name;
    }
    this.updateIngredients();
  }
  deleteIngredient(delIngredient: Ingredient) {
    const index = this.ingredients.findIndex((ingredient) => {
      return ingredient.name === delIngredient.name;
    });
    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.updateIngredients();
    }
  }
  updateIngredients() {
    this.ingredientsUpdated.next(this.ingredients.slice());
  }
  onSelectedIngredient(ing: Ingredient) {
    this.ingredientSelected.next(ing);
  }
}
