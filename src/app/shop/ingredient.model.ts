export class Ingredient {
  id: number;
  constructor(public name: string, public amount: number) {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.name = name;
    this.amount = amount;
  }
}
