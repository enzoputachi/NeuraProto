import PostRepository from "../repositories/postRepository.js";
import User from "../models/userModel.js";

const postRepository = new PostRepository();

export const createPostService = async (expertId, title, content, tags = '') => {
    try {
        // Verify user is an expert
        const expert = await User.findById(expertId);
        if (!expert || !expert.role.includes('expert')) {
            throw new Error('Only experts can create posts');
        }

        const post = await postRepository.create({
            expertId,
            title,
            content,
            tags
        });

        const populatedPost = await postRepository.findById(post._id, 'expertId');

        return {
            success: true,
            post: populatedPost,
            message: 'Post created successfully'
        };
    } catch (error) {
        console.error('Error in createPostService:', error.message);
        throw new Error(error.message || 'Failed to create post');
    }
};

export const getPostsService = async (userId = null, limit = 10, skip = 0) => {
    try {
        // If userId provided, check if they have access to expert content
        if (userId) {
            const user = await User.findById(userId).populate('subscribedExpert');
            if (user && user.subscribedExpert.length > 0) {
                // User can see posts from subscribed experts
                const expertIds = user.subscribedExpert.map(expert => expert._id);
                const posts = await postRepository.findByExpertIds(expertIds, {
                    populate: 'expertId',
                    sort: { createdAt: -1 },
                    limit,
                    skip
                });

                return {
                    success: true,
                    posts
                };
            } else {
                // User has no subscriptions, return empty result
                return {
                    success: true,
                    posts: [],
                    message: 'No subscriptions found'
                };
            }
        }

        const posts = await postRepository.findAll({
            populate: 'expertId',
            sort: { createdAt: -1 },
            limit,
            skip
        });

        return {
            success: true,
            posts
        };
    } catch (error) {
        console.error('Error in getPostsService:', error.message);
        throw new Error('Failed to fetch posts');
    }
};

export const getPostByIdService = async (postId, userId = null) => {
    try {
        const post = await postRepository.findById(postId, 'expertId');

        if (!post) {
            throw new Error('Post not found');
        }

        // Check if user has access to this post
        if (userId) {
            const user = await User.findById(userId).populate('subscribedExpert');
            const hasAccess = user.subscribedExpert.some(expert => 
                expert._id.toString() === post.expertId._id.toString()
            ) || user.role.includes('admin');

            if (!hasAccess) {
                throw new Error('Access denied. Subscribe to this expert to view their posts.');
            }
        }

        return {
            success: true,
            post
        };
    } catch (error) {
        console.error('Error in getPostByIdService:', error.message);
        throw new Error(error.message || 'Failed to fetch post');
    }
};

export const updatePostService = async (postId, expertId, updateData) => {
    try {
        const post = await postRepository.findById(postId);
        
        if (!post) {
            throw new Error('Post not found');
        }

        // Check if expert owns this post
        if (post.expertId.toString() !== expertId.toString()) {
            throw new Error('Access denied. You can only update your own posts.');
        }

        const updatedPost = await postRepository.update(postId, updateData, {
            populate: 'expertId'
        });

        return {
            success: true,
            post: updatedPost,
            message: 'Post updated successfully'
        };
    } catch (error) {
        console.error('Error in updatePostService:', error.message);
        throw new Error(error.message || 'Failed to update post');
    }
};

export const deletePostService = async (postId, expertId) => {
    try {
        const post = await postRepository.findById(postId);
        
        if (!post) {
            throw new Error('Post not found');
        }

        // Check if expert owns this post
        if (post.expertId.toString() !== expertId.toString()) {
            throw new Error('Access denied. You can only delete your own posts.');
        }

        await postRepository.delete(postId);

        return {
            success: true,
            message: 'Post deleted successfully'
        };
    } catch (error) {
        console.error('Error in deletePostService:', error.message);
        throw new Error(error.message || 'Failed to delete post');
    }
};

export const getExpertPostsService = async (expertId, limit = 10, skip = 0) => {
    try {
        const posts = await postRepository.findByExpertId(expertId, {
            populate: 'expertId',
            sort: { createdAt: -1 },
            limit,
            skip
        });

        return {
            success: true,
            posts
        };
    } catch (error) {
        console.error('Error in getExpertPostsService:', error.message);
        throw new Error('Failed to fetch expert posts');
    }
};