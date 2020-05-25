import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient.model';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ingForm') ingForm: NgForm;
  ingSelected: Subscription;
  isSelected = false;
  ingredient: any;
  oldIngredient: Ingredient;
  diagnostics: any;
  ifDev: boolean;
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.ingredient = {
      name: '',
      amount: null,
    };
    this.ingSelected = this.shopService.ingredientSelected.subscribe((ing) => {
      this.isSelected = true;
      this.oldIngredient = ing;
      this.ingredient = Object.assign({}, ing);
    });
  }

  addIngredient() {
    this.shopService.addIngredient(this.ingredient);
    this.onClear();
  }
  updateIngredient() {
    this.shopService.updateIngredient(this.ingredient, this.oldIngredient);
    this.onClear();
  }
  deleteIngredient() {
    this.shopService.deleteIngredient(this.ingredient);
    this.onClear();
  }
  onClear() {
    this.isSelected = false;
    this.ingForm.resetForm();
  }
  ngAfterViewInit() {
    this.ingForm.valueChanges.subscribe((changes) => {
      this.diagnostics = changes;
    });
  }
  ngOnDestroy() {
    this.ingSelected.unsubscribe();
  }
}
