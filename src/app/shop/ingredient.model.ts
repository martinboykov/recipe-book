export class Ingredient {
  constructor(public name: string, public amount: number, public id?:number) {
    this.name = name;
    this.amount = amount;
    this.id = id || Math.floor(100000 + Math.random() * 900000);
  }
}
