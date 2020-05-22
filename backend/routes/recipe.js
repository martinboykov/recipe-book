/* eslint new-cap: ["error", { "capIsNew": false }]*/
const express = require('express');

const router = express.Router();

const recipeController = require('../controllers/recipe');

const images = require('../middleware/image');

router.get('/', recipeController.getRecipes);

// router.get('/totalCount', recipeController.getRecipesTotalCount);

router.get('/:_id', recipeController.getRecipe);

router.post('/',
  // images.multer.single('imagePath'),
  // images.sendUploadToGCS,
  recipeController.addRecipe);

router.put('/:_id',
  // images.multer.single('imagePath'),
  // images.sendUploadToGCS,
  recipeController.editRecipe);

router.delete('/:_id', recipeController.delRecipe);

module.exports = router;
