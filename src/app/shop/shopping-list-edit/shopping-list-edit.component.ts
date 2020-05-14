import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  addIngredient(ing) {
    const newIngredient = new Ingredient(ing.name.value, ing.amount.value);
    this.ingredientAdded.emit(newIngredient);
  }
}
