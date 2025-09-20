import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost, getExpertPosts } from '../controllers/postController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', getPosts);
router.get('/expert/:expertId', getExpertPosts);
router.get('/:postId', getPostById);
router.patch('/:postId', authenticate, updatePost);
router.delete('/:postId', authenticate, deletePost);

export default router;