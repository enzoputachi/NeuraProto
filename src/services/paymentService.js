import PaymentRepository from "../repositories/paymentRepository.js";
import User from "../models/userModel.js";
import Plan from "../models/planModel.js";

const paymentRepository = new PaymentRepository();

export const createPaymentService = async (userId, planId, amountInKobo, paystackRef = null) => {
    try {
        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify plan exists
        const plan = await Plan.findById(planId);
        if (!plan) {
            throw new Error('Investment plan not found');
        }

        // Validate amount is within plan range
        const amountInNaira = amountInKobo / 100;
        if (amountInNaira < plan.priceRange.min || amountInNaira > plan.priceRange.max) {
            throw new Error(`Amount must be between ₦${plan.priceRange.min} and ₦${plan.priceRange.max}`);
        }

        const payment = await paymentRepository.create({
            userId,
            planId,
            amountInKobo,
            paystackRef,
            status: 'pending'
        });

        const populatedPayment = await paymentRepository.findById(payment._id, [
            { path: 'userId', select: 'name email' },
            { path: 'planId', select: 'name duration' }
        ]);

        return {
            success: true,
            payment: populatedPayment,
            message: 'Payment record created successfully'
        };
    } catch (error) {
        console.error('Error in createPaymentService:', error.message);
        throw new Error(error.message || 'Failed to create payment record');
    }
};

export const updatePaymentStatusService = async (paymentId, status, paystackRef = null) => {
    try {
        const validStatuses = ['pending', 'completed', 'failed'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid payment status');
        }

        const updateData = { status };
        if (paystackRef) {
            updateData.paystackRef = paystackRef;
        }

        const payment = await paymentRepository.update(paymentId, updateData, {
            populate: [
                { path: 'userId', select: 'name email' },
                { path: 'planId', select: 'name duration' }
            ]
        });

        if (!payment) {
            throw new Error('Payment record not found');
        }

        // If payment completed, assign plan to user
        if (status === 'completed') {
            await User.findByIdAndUpdate(
                payment.userId._id,
                { $addToSet: { investmentPlan: payment.planId._id } }
            );
        }

        return {
            success: true,
            payment,
            message: `Payment status updated to ${status}`
        };
    } catch (error) {
        console.error('Error in updatePaymentStatusService:', error.message);
        throw new Error(error.message || 'Failed to update payment status');
    }
};

export const getUserPaymentsService = async (userId) => {
    try {
        const payments = await paymentRepository.findByUserId(userId, {
            populate: { path: 'planId', select: 'name duration' },
            sort: { createdAt: -1 }
        });

        return {
            success: true,
            payments
        };
    } catch (error) {
        console.error('Error in getUserPaymentsService:', error.message);
        throw new Error('Failed to fetch user payments');
    }
};

export const getPaymentByIdService = async (paymentId) => {
    try {
        const payment = await paymentRepository.findById(paymentId, [
            { path: 'userId', select: 'name email' },
            { path: 'planId', select: 'name duration priceRange' }
        ]);

        if (!payment) {
            throw new Error('Payment record not found');
        }

        return {
            success: true,
            payment
        };
    } catch (error) {
        console.error('Error in getPaymentByIdService:', error.message);
        throw new Error(error.message || 'Failed to fetch payment record');
    }
};