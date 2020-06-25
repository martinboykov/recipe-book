const { Recipe } = require('../models/recipe');
const debug = require('debug')('debug');

module.exports = {
  Query: {
    recipes: async (parent, args, context, info) => {
      const recipes = await Recipe.find();
      if (recipes.length <= 0) {
        return res.status(400).json({ message: 'No recipes yet!' });
      }
      return {
        message: 'Recipes fetched successfully',
        data: recipes.map((recipe) => {
          return {
            _id: recipe._id.toString(),
            name: recipe.name,
            description: recipe.description,
            imagePath: recipe.imagePath,
            dateCreated: recipe.dateCreated.toISOString(),
            ingredients: recipe.ingredients
          }
        })
      }
    },
    recipe: async (parent, args, context, info) => {
      const _id = args._id;
      const recipe = await Recipe.findOne({
        _id: _id
      });
      if (!recipe) {
        return res.status(400).json({ message: 'No such recipe!' });
      }
      return {
        message: 'Recipe fetched successfully',
        data: {
          _id: recipe._id.toString(),
          name: recipe.name,
          description: recipe.description,
          imagePath: recipe.imagePath,
          dateCreated: recipe.dateCreated.toISOString(),
          ingredients: recipe.ingredients
        }
      }
    },

    // addRecipe: async (req, res, next) => {
    //   const recipe = new Recipe({
    //     name: req.body.name,
    //     description: req.body.description,
    //     imagePath: req.body.imagePath,
    //     ingredients: [...req.body.ingredients],
    //   });

    //   await recipe.save();

    //   return res.status(201).json({
    //     message: 'Recipe added successfully',
    //     data: recipe,
    //   });
    // },

    // editRecipe: async (req, res, next) => {
    //   const recipe = await Recipe.findOneAndUpdate(
    //     { _id: req.params._id },
    //     {
    //       $set: {
    //         name: req.body.name,
    //         description: req.body.description,
    //         imagePath: req.body.imagePath,
    //         ingredients: [...req.body.ingredients]
    //       }
    //     },
    //     { new: true }
    //   );
    //   return res.status(201).json({
    //     message: 'Recipe edited successfully',
    //     data: recipe,
    //   });
    // },

    // delRecipe: async (req, res, next) => {
    //   await Recipe.deleteOne({ _id: req.params._id });

    //   return res.status(201).json({
    //     message: 'Recipe deleted successfully',
    //   });
    // }
  }
}



