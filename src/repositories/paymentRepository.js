import BaseRepository from './baseRepository.js';
import Payment from '../models/paymentModel.js';

class PaymentRepository extends BaseRepository {
    constructor() {
        super(Payment);
    }

    /**
     * Find payments by user ID
     * @param {string} userId - User ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of payments
     */
    async findByUserId(userId, options = {}) {
        return await this.findByCriteria({ userId }, options);
    }

    /**
     * Find payments by status
     * @param {string} status - Payment status
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of payments
     */
    async findByStatus(status, options = {}) {
        return await this.findByCriteria({ status }, options);
    }
}

export default PaymentRepository;