import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';
import {
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode: boolean;
  recipeForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    imagePath: ['', Validators.required],
    description: ['', Validators.required],
    // ingredients: this.fb.array([], validateSize),
  });

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get name() {
    return this.recipeForm.get('name');
  }
  get imagePath() {
    return this.recipeForm.get('imagePath');
  }
  get description() {
    return this.recipeForm.get('description');
  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.editMode = true;
        this.recipe = this.recipeService.getRecipe(this.id);
        this.recipeForm.patchValue({
          id: this.recipe.id,
          name: this.recipe.name,
          imagePath: this.recipe.imagePath,
          description: this.recipe.description,
        });
        const ingArrControl = this.recipe.ingredients.reduce(
          (prevValue, currValue) => {
            prevValue.push(
              this.fb.group({
                name: [currValue.name, Validators.required],
                amount: [currValue.amount, Validators.required],
              })
            );
            return prevValue;
          },
          []
        );
        this.recipeForm.registerControl(
          'ingredients',
          new FormArray(ingArrControl, validateSize)
        );
      } else {
        this.editMode = false;
        this.recipeForm.registerControl(
          'ingredients',
          new FormArray(
            [
              this.fb.group({
                name: ['', Validators.required],
                amount: ['', Validators.required],
              }),
            ],
            validateSize
          )
        );
      }
    });
    this.recipeForm.statusChanges.subscribe((changes) => {
      console.log(changes);
    });
  }
  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
      })
    );
  }
  delIngredient(index) {
    this.ingredients.removeAt(index);
  }
  onSubmit() {
    this.recipeService.addRecipe(this.recipeForm.value);
    this.router.navigate(['recipe-book']);
  }
  onEditRecipe() {
    this.recipeService.updateRecipe(this.recipeForm.value);
    this.goBack();
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
function validateSize(arr: FormArray) {
  return arr.length <= 0 && arr.length >= 20
    ? {
        invalidSize: true,
      }
    : null;
}
