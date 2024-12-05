/**
 * @fileoverview API routes for managing comments.
 */

const router = require('express').Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

// Hey GitHub Copilot, I'm trying to create a new comment

/**
 * GET /
 * Retrieves all comments.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /:id
 * Deletes a comment by ID.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
