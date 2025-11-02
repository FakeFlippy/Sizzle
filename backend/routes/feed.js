const express = require('express');
const router = express.Router();

/**
 * Feed Routes
 * 
 * Handles social feed posts, likes, and comments
 */

// Mock posts data
const mockPosts = [
  {
    id: '1',
    userId: 'user1',
    username: 'foodie_chef',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    caption: 'Made these amazing tacos for dinner tonight! 🌮🔥',
    recipeId: '1',
    recipeName: 'Spicy Chicken Tacos',
    likes: 234,
    comments: 18,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isVideo: false,
  },
];

// GET /api/feed - Get feed posts
router.get('/', async (req, res) => {
  try {
    const { limit = 10, offset = 0, userId } = req.query;
    
    // TODO: Fetch from Firebase Firestore with pagination
    // Implement personalized feed algorithm based on user preferences
    
    const posts = mockPosts.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );
    
    res.json({
      success: true,
      data: posts,
      total: mockPosts.length,
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

// GET /api/feed/:postId - Get single post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = mockPosts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }
    
    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/feed - Create new post
router.post('/', async (req, res) => {
  try {
    const { userId, caption, image, recipeId, isVideo } = req.body;
    
    const newPost = {
      id: Date.now().toString(),
      userId,
      caption,
      image,
      recipeId,
      isVideo: isVideo || false,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };
    
    // TODO: Save to Firebase Firestore
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/feed/:postId/like - Like a post
router.post('/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    
    // TODO: Update like count in Firebase
    
    res.json({
      success: true,
      message: 'Post liked successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /api/feed/:postId/unlike - Unlike a post
router.delete('/:postId/unlike', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    
    // TODO: Update like count in Firebase
    
    res.json({
      success: true,
      message: 'Post unliked successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/feed/:postId/comments - Add comment to post
router.post('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;
    
    const newComment = {
      id: Date.now().toString(),
      userId,
      text,
      timestamp: new Date().toISOString(),
    };
    
    // TODO: Save to Firebase
    
    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/feed/:postId/comments - Get post comments
router.get('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    
    // TODO: Fetch from Firebase
    
    res.json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
