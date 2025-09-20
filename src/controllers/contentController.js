// src/controllers/postController.js
import * as postService from "../services/postService.js";

export const createPost = async (req, res) => {
    try {
        const { expertId, title, content, tags } = req.body;
        const result = await postService.createPostService(expertId, title, content, tags);
        res.status(201).json(result);
    } catch (error) {
        const statusCode = error.message === 'Only experts can create posts' ? 403 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { userId } = req.query;
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        
        const result = await postService.getPostsService(userId, limit, skip);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.query;
        
        const result = await postService.getPostByIdService(postId, userId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Post not found' ? 404 : 
                          error.message.includes('Access denied') ? 403 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { expertId } = req.body;
        const updateData = req.body;
        
        const result = await postService.updatePostService(postId, expertId, updateData);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Post not found' ? 404 :
                          error.message.includes('Access denied') ? 403 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { expertId } = req.body;
        
        const result = await postService.deletePostService(postId, expertId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Post not found' ? 404 :
                          error.message.includes('Access denied') ? 403 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getExpertPosts = async (req, res) => {
    try {
        const { expertId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        
        const result = await postService.getExpertPostsService(expertId, limit, skip);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};