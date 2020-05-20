import { Ingredient } from '../shop/ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public id?: number
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.id = id || Math.floor(100000000 + Math.random() * 900000000);
  }
}
