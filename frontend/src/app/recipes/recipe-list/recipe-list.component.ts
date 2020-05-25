import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rService: RecipeService
  ) {}
  ngOnInit() {
    this.rService.recipesUpdated.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
  addRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
