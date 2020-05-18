import { Ingredient } from '../shop/ingredient.model';

export class Recipe {
  id: number;
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {
    this.id = Math.floor(100000000 + Math.random() * 900000000);
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
