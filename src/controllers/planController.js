// src/controllers/planController.js
import * as planService from "../services/planService.js";

export const getAllPlans = async (req, res) => {
    try {
        const result = await planService.getAllPlansService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPlanById = async (req, res) => {
    try {
        const { planId } = req.params;
        const result = await planService.getPlanByIdService(planId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Investment plan not found' ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const createPlan = async (req, res) => {
    try {
        const planData = req.body;
        const result = await planService.createPlanService(planData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const updateData = req.body;
        const result = await planService.updatePlanService(planId, updateData);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Investment plan not found' ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const assignPlanToUser = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const result = await planService.assignPlanToUserService(userId, planId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getPlansByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const result = await planService.getPlansByPriceRangeService(
            parseInt(minPrice), 
            parseInt(maxPrice)
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const deletePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const result = await planService.deletePlanService(planId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message === 'Investment plan not found' ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getPlansCount = async (req, res) => {
    try {
        const result = await planService.getPlansCountService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};