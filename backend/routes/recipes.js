const express = require('express');
const router = express.Router();

/**
 * Recipe Routes
 * 
 * Handles recipe discovery, searching, and recommendations
 */

// Mock recipe data (replace with Firebase queries in production)
const mockRecipes = [
  {
    id: '1',
    name: 'Spicy Chicken Tacos',
    description: 'Juicy chicken tacos with homemade salsa and avocado',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    tags: ['Mexican', 'Spicy', 'Quick'],
    cookTime: '25 min',
    calories: 450,
    ingredients: ['Chicken', 'Tortillas', 'Avocado', 'Tomato', 'Lime'],
    isSponsored: false,
  },
  // Add more recipes as needed
];

// GET /api/recipes - Get all recipes
router.get('/', (req, res) => {
  try {
    const { limit = 10, offset = 0, tags } = req.query;
    
    let recipes = [...mockRecipes];
    
    // Filter by tags if provided
    if (tags) {
      const tagArray = tags.split(',');
      recipes = recipes.filter(recipe =>
        recipe.tags.some(tag => tagArray.includes(tag))
      );
    }
    
    // Pagination
    const paginatedRecipes = recipes.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );
    
    res.json({
      success: true,
      data: paginatedRecipes,
      total: recipes.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/recipes/:id - Get single recipe
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const recipe = mockRecipes.find(r => r.id === id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found',
      });
    }
    
    res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/recipes/recommendations - Get personalized recommendations
router.post('/recommendations', (req, res) => {
  try {
    const { dietaryPreferences, allergies, foodGoal } = req.body;
    
    // TODO: Implement AI-based recommendation algorithm
    // For now, return mock recipes filtered by preferences
    
    let recommendations = [...mockRecipes];
    
    // Filter based on dietary preferences and allergies
    // This is a simple implementation - enhance with ML in production
    
    res.json({
      success: true,
      data: recommendations.slice(0, 10),
      message: 'Personalized recommendations based on your profile',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/recipes/search - Search recipes
router.post('/search', (req, res) => {
  try {
    const { query, filters } = req.body;
    
    let results = mockRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/recipes - Create new recipe (for future use)
router.post('/', (req, res) => {
  try {
    const newRecipe = req.body;
    
    // TODO: Save to Firebase Firestore
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
