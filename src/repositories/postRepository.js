import BaseRepository from './baseRepository.js';
import Post from '../models/postModel.js';

class PostRepository extends BaseRepository {
    constructor() {
        super(Post);
    }

    /**
     * Find posts by expert ID
     * @param {string} expertId - Expert ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of posts
     */
    async findByExpertId(expertId, options = {}) {
        return await this.findByCriteria({ expertId }, options);
    }

    /**
     * Find posts by multiple expert IDs
     * @param {Array} expertIds - Array of expert IDs
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of posts
     */
    async findByExpertIds(expertIds, options = {}) {
        return await this.findByCriteria({ expertId: { $in: expertIds } }, options);
    }
}

export default PostRepository;