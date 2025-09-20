/**
 * Base Repository class that provides common database operations
 * Other repositories can extend this class to inherit common functionality
 */
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    /**
     * Find all documents
     * @param {Object} options - Query options (sort, limit, skip, populate)
     * @returns {Promise<Array>} Array of documents
     */
    async findAll(options = {}) {
        const { sort = {}, limit, skip, populate } = options;
        let query = this.model.find();
        
        if (Object.keys(sort).length > 0) {
            query = query.sort(sort);
        }
        
        if (limit) {
            query = query.limit(limit);
        }
        
        if (skip) {
            query = query.skip(skip);
        }
        
        if (populate) {
            query = query.populate(populate);
        }
        
        return await query;
    }

    /**
     * Find a document by ID
     * @param {string} id - Document ID
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Object|null>} Document or null if not found
     */
    async findById(id, populate = null) {
        let query = this.model.findById(id);
        
        if (populate) {
            query = query.populate(populate);
        }
        
        return await query;
    }

    /**
     * Find one document by criteria
     * @param {Object} criteria - Search criteria
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Object|null>} Document or null if not found
     */
    async findOne(criteria, populate = null) {
        let query = this.model.findOne(criteria);
        
        if (populate) {
            query = query.populate(populate);
        }
        
        return await query;
    }

    /**
     * Find documents by criteria
     * @param {Object} criteria - Search criteria
     * @param {Object} options - Query options (sort, limit, skip, populate)
     * @returns {Promise<Array>} Array of matching documents
     */
    async findByCriteria(criteria, options = {}) {
        const { sort = {}, limit, skip, populate } = options;
        let query = this.model.find(criteria);
        
        if (Object.keys(sort).length > 0) {
            query = query.sort(sort);
        }
        
        if (limit) {
            query = query.limit(limit);
        }
        
        if (skip) {
            query = query.skip(skip);
        }
        
        if (populate) {
            query = query.populate(populate);
        }
        
        return await query;
    }

    /**
     * Create a new document
     * @param {Object} data - Data to create document with
     * @returns {Promise<Object>} Created document
     */
    async create(data) {
        const document = new this.model(data);
        return await document.save();
    }

    /**
     * Create multiple documents
     * @param {Array} dataArray - Array of data objects
     * @returns {Promise<Array>} Array of created documents
     */
    async createMany(dataArray) {
        return await this.model.insertMany(dataArray);
    }

    /**
     * Update a document by ID
     * @param {string} id - Document ID
     * @param {Object} updateData - Data to update
     * @param {Object} options - Update options
     * @returns {Promise<Object|null>} Updated document or null if not found
     */
    async update(id, updateData, options = {}) {
        const defaultOptions = { new: true, runValidators: true };
        const mergedOptions = { ...defaultOptions, ...options };
        
        let query = this.model.findByIdAndUpdate(id, updateData, mergedOptions);
        
        if (options.populate) {
            query = query.populate(options.populate);
        }
        
        return await query;
    }

    /**
     * Update one document by criteria
     * @param {Object} criteria - Search criteria
     * @param {Object} updateData - Data to update
     * @param {Object} options - Update options
     * @returns {Promise<Object|null>} Updated document or null if not found
     */
    async updateOne(criteria, updateData, options = {}) {
        const defaultOptions = { new: true, runValidators: true };
        const mergedOptions = { ...defaultOptions, ...options };
        
        let query = this.model.findOneAndUpdate(criteria, updateData, mergedOptions);
        
        if (options.populate) {
            query = query.populate(options.populate);
        }
        
        return await query;
    }

    /**
     * Update multiple documents
     * @param {Object} criteria - Search criteria
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object>} Update result
     */
    async updateMany(criteria, updateData) {
        return await this.model.updateMany(criteria, updateData);
    }

    /**
     * Delete a document by ID
     * @param {string} id - Document ID
     * @returns {Promise<Object|null>} Deleted document or null if not found
     */
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    /**
     * Delete one document by criteria
     * @param {Object} criteria - Search criteria
     * @returns {Promise<Object|null>} Deleted document or null if not found
     */
    async deleteOne(criteria) {
        return await this.model.findOneAndDelete(criteria);
    }

    /**
     * Delete multiple documents
     * @param {Object} criteria - Search criteria
     * @returns {Promise<Object>} Delete result
     */
    async deleteMany(criteria) {
        return await this.model.deleteMany(criteria);
    }

    /**
     * Count documents by criteria
     * @param {Object} criteria - Search criteria (default: {})
     * @returns {Promise<number>} Number of matching documents
     */
    async count(criteria = {}) {
        return await this.model.countDocuments(criteria);
    }

    /**
     * Check if a document exists by ID
     * @param {string} id - Document ID
     * @returns {Promise<boolean>} True if document exists, false otherwise
     */
    async exists(id) {
        const document = await this.model.findById(id).select('_id');
        return !!document;
    }

    /**
     * Check if a document exists by criteria
     * @param {Object} criteria - Search criteria
     * @returns {Promise<boolean>} True if document exists, false otherwise
     */
    async existsByCriteria(criteria) {
        const document = await this.model.findOne(criteria).select('_id');
        return !!document;
    }

    /**
     * Aggregate query
     * @param {Array} pipeline - Aggregation pipeline
     * @returns {Promise<Array>} Aggregation result
     */
    async aggregate(pipeline) {
        return await this.model.aggregate(pipeline);
    }

    /**
     * Get distinct values for a field
     * @param {string} field - Field name
     * @param {Object} criteria - Search criteria (optional)
     * @returns {Promise<Array>} Array of distinct values
     */
    async distinct(field, criteria = {}) {
        return await this.model.distinct(field, criteria);
    }
}

export default BaseRepository;