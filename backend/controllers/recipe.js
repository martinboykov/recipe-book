const { Recipe } = require('../models/recipe');
const debug = require('debug')('debug');

const getRecipes = async (req, res, next) => {
    const recipes = await Recipe.find();
    if (recipes.length <= 0) {
        return res.status(400).json({ message: 'No recipes yet!' });
    }
    return res.status(200).json({
        message: 'Recipes fetched successfully',
        data: recipes,
    });
};
const getRecipe = async (req, res, next) => {
    const _id = req.params._id;
    const recipe = await Recipe.findOne({
        _id: _id
    });
    if (!recipe) {
        return res.status(400).json({ message: 'No such recipe!' });
    }
    return res.status(200).json({
        message: 'Recipe fetched successfully',
        data: recipe,
    });
};

const addRecipe = async (req, res, next) => {
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        ingredients: [...req.body.ingredients],
    });

    await recipe.save();

    return res.status(201).json({
        message: 'Recipe added successfully',
        data: recipe,
    });
};

const editRecipe = async (req, res, next) => {
    const recipe = await Recipe.updateOne({
        _id: req.params._id,
    }, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            imagePath: req.body.imagePath,
            ingredients: [...req.body.ingredients],
        },
    });

    return res.status(201).json({
        message: 'Recipe edited successfully',
        data: recipe,
    });
};

const delRecipe = async (req, res, next) => {
    await Recipe.deleteOne({ _id: req.params._id });

    return res.status(201).json({
        message: 'Recipe deleted successfully',
    });
};

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    delRecipe
};
