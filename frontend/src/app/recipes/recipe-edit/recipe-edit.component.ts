import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  _id: string;
  editMode: boolean;
  recipeForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    imagePath: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: new FormArray([], validateSize),
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
      this._id = params.get('_id');
      if (this._id) {
        this.editMode = true;
        this.recipeService.getRecipe(this._id).subscribe((res: Recipe) => {
          console.log(res);

          this.recipe = res;
          this.recipeForm.patchValue({
            _id: this.recipe._id,
            name: this.recipe.name,
            imagePath: this.recipe.imagePath,
            description: this.recipe.description,
          });
          this.recipe.ingredients.forEach((recipe) => {
            this.ingredients.push(
              this.fb.group({
                name: [recipe.name, Validators.required],
                amount: [recipe.amount, Validators.required],
              })
            );
          });
        });
      } else {
        this.editMode = false;
        this.ingredients.push(
          this.fb.group({
            name: ['', Validators.required],
            amount: ['', Validators.required],
          })
        );
      }
    });
    this.recipeForm.statusChanges.subscribe((changes) => {
      // console.log(changes);
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
  }
  onEditRecipe() {
    this.recipeService.editRecipe(this.recipeForm.value);
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
