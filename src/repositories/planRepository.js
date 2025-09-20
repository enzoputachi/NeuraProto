// src/repositories/planRepository.js
import Plan from "../models/planModel.js";
import BaseRepository from "./baseRepository.js";

class PlanRepository extends BaseRepository {
    constructor() {
        super(Plan);
    }

    /**
     * Get all plans sorted by minimum price
     * @returns {Promise<Array>} Array of plan documents
     */
    async findAllSortedByPrice() {
        return await this.findAll({ sort: { 'priceRange.min': 1 } });
    }

    /**
     * Find plans by price range
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @returns {Promise<Array>} Array of matching plan documents
     */
    async findByPriceRange(minPrice, maxPrice) {
        const criteria = {
            'priceRange.min': { $gte: minPrice },
            'priceRange.max': { $lte: maxPrice }
        };
        
        return await this.findByCriteria(criteria, {
            sort: { 'priceRange.min': 1 }
        });
    }

    /**
     * Find plans by duration
     * @param {number} duration - Duration in months
     * @returns {Promise<Array>} Array of matching plan documents
     */
    async findByDuration(duration) {
        return await this.findByCriteria({ duration });
    }

    /**
     * Find plans by expected return range
     * @param {number} minReturn - Minimum expected return
     * @param {number} maxReturn - Maximum expected return
     * @returns {Promise<Array>} Array of matching plan documents
     */
    async findByExpectedReturnRange(minReturn, maxReturn) {
        const criteria = {
            'expectedReturn.min': { $gte: minReturn },
            'expectedReturn.max': { $lte: maxReturn }
        };
        
        return await this.findByCriteria(criteria);
    }
}

export default new PlanRepository();