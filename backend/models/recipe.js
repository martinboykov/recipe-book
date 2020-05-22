const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20000,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  imagePath: {
    type: String,
    required: true,
  },
  ingredients: [{
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  }],
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = {
  Recipe
};
