// src/controllers/paymentController.js
import * as paymentService from "../services/paymentService.js";

export const createPayment = async (req, res) => {
    try {
        const { userId, planId, amountInKobo, paystackRef } = req.body;
        const result = await paymentService.createPaymentService(userId, planId, amountInKobo, paystackRef);
        res.status(201).json(result);
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status, paystackRef } = req.body;
        const result = await paymentService.updatePaymentStatusService(paymentId, status, paystackRef);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Payment record not found' ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserPayments = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await paymentService.getUserPaymentsService(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const result = await paymentService.getPaymentByIdService(paymentId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Payment record not found' ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};