const { Recipe } = require('../models/recipe');
const debug = require('debug')('debug');

module.exports = {
  Query: {
    getRecipes: async (parent, args, context, info) => {
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
    getRecipe: async (_, args, context, info) => {
      const _id = args.input;
      console.log(_id);
      const recipe = await Recipe.findOne({
        _id: _id
      });
      if (!recipe) {
        // return res.status(400).json({ message: 'No such recipe!' });
        return { message: 'No such recipe!' };
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
  },
  Mutation: {
    addRecipe: async (_, args) => {
      const recipe = new Recipe({
        name: args.input.name,
        description: args.input.description,
        imagePath: args.input.imagePath,
        ingredients: args.input.ingredients,
      });

      await recipe.save();

      return {
        message: 'Recipe was added successfully',
        data: recipe,
      };
    },
    editRecipe: async (_, args) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: args.input._id },
        {
          $set: {
            name: args.input.name,
            description: args.input.description,
            imagePath: args.input.imagePath,
            ingredients: [...args.input.ingredients]
          }
        },
        { new: true }
      );

      return {
        message: 'Recipe was edited successfully',
        data: recipe,
      };
    },
    deleteRecipe: async (_, args) => {
      console.log(args.input);
      const recipe = await Recipe.findOneAndDelete({ _id: args.input });
      console.log(recipe);
      return {
        message: 'Recipe was deleted successfully',
        data: recipe,
      };
    },


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



