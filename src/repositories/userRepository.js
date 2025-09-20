// src/repositories/userRepository.js
import User from "../models/userModel.js";
import BaseRepository from "./baseRepository.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * Add an item to a user's array field (like investment plans)
     * @param {string} userId - The user ID
     * @param {string} field - The field name to add to
     * @param {any} value - The value to add
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Object|null>} Updated user document or null if not found
     */
    async addToArray(userId, field, value, populate = null) {
        const updateQuery = { $addToSet: { [field]: value } };
        
        return await this.update(userId, updateQuery, { populate });
    }

    /**
     * Remove an item from a user's array field
     * @param {string} userId - The user ID
     * @param {string} field - The field name to remove from
     * @param {any} value - The value to remove
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Object|null>} Updated user document or null if not found
     */
    async removeFromArray(userId, field, value, populate = null) {
        const updateQuery = { $pull: { [field]: value } };
        
        return await this.update(userId, updateQuery, { populate });
    }

    /**
     * Find user by email
     * @param {string} email - User email
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Object|null>} User document or null if not found
     */
    async findByEmail(email, populate = null) {
        return await this.findOne({ email }, populate);
    }

    /**
     * Find users by role
     * @param {string} role - User role
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Array>} Array of user documents
     */
    async findByRole(role, populate = null) {
        return await this.findByCriteria({ role }, { populate });
    }

    /**
     * Find users with specific investment plans
     * @param {string} planId - Investment plan ID
     * @param {string|Array|Object} populate - Fields to populate
     * @returns {Promise<Array>} Array of user documents
     */
    async findByInvestmentPlan(planId, populate = null) {
        return await this.findByCriteria({ investmentPlan: planId }, { populate });
    }
}

export default new UserRepository();