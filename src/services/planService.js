// src/services/planService.js (Refactored)
import planRepository from "../repositories/planRepository.js";
import userRepository from "../repositories/userRepository.js";

export const getAllPlansService = async () => {
    try {
        const plans = await planRepository.findAll();
        
        return {
            success: true,
            plans
        };
    } catch (error) {
        console.error('Error in getAllPlansService:', error.message);
        throw new Error('Failed to fetch investment plans');
    }
};

export const getPlanByIdService = async (planId) => {
    try {
        const plan = await planRepository.findById(planId);
        
        if (!plan) {
            throw new Error('Investment plan not found');
        }

        return {
            success: true,
            plan
        };
    } catch (error) {
        console.error('Error in getPlanByIdService:', error.message);
        throw new Error(error.message || 'Failed to fetch investment plan');
    }
};

export const createPlanService = async (planData) => {
    try {
        const { name, description, priceRange, duration, expectedReturn } = planData;

        // Business logic validation
        if (priceRange.min >= priceRange.max) {
            throw new Error('Minimum price must be less than maximum price');
        }

        if (expectedReturn.min >= expectedReturn.max) {
            throw new Error('Minimum expected return must be less than maximum expected return');
        }

        // Delegate data persistence to repository
        const newPlan = await planRepository.create({
            name,
            description,
            priceRange,
            duration,
            expectedReturn
        });

        return {
            success: true,
            plan: newPlan,
            message: 'Investment plan created successfully'
        };
    } catch (error) {
        console.error('Error in createPlanService:', error.message);
        throw new Error(error.message || 'Failed to create investment plan');
    }
};

export const updatePlanService = async (planId, updateData) => {
    try {
        const { priceRange, expectedReturn } = updateData;

        // Business logic validation
        if (priceRange && priceRange.min >= priceRange.max) {
            throw new Error('Minimum price must be less than maximum price');
        }

        if (expectedReturn && expectedReturn.min >= expectedReturn.max) {
            throw new Error('Minimum expected return must be less than maximum expected return');
        }

        // Delegate data persistence to repository
        const updatedPlan = await planRepository.update(planId, updateData);

        if (!updatedPlan) {
            throw new Error('Investment plan not found');
        }

        return {
            success: true,
            plan: updatedPlan,
            message: 'Investment plan updated successfully'
        };
    } catch (error) {
        console.error('Error in updatePlanService:', error.message);
        throw new Error(error.message || 'Failed to update investment plan');
    }
};

export const assignPlanToUserService = async (userId, planId) => {
    try {
        // Check if plan exists using repository
        const planExists = await planRepository.exists(planId);
        if (!planExists) {
            throw new Error('Investment plan not found');
        }

        // Delegate user update to repository with population
        const user = await userRepository.addToArray(
            userId,
            'investmentPlan',
            planId,
            {
                path: 'investmentPlan',
                select: 'name priceRange duration expectedReturn'
            }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return {
            success: true,
            message: 'Investment plan assigned successfully',
            user: {
                id: user._id,
                name: user.name,
                investmentPlan: user.investmentPlan
            }
        };
    } catch (error) {
        console.error('Error in assignPlanToUserService:', error.message);
        throw new Error(error.message || 'Failed to assign investment plan');
    }
};

// Additional service methods that leverage the repository layer

export const getPlansByPriceRangeService = async (minPrice, maxPrice) => {
    try {
        const criteria = {
            'priceRange.min': { $gte: minPrice },
            'priceRange.max': { $lte: maxPrice }
        };
        
        const plans = await planRepository.findByCriteria(criteria, {
            sort: { 'priceRange.min': 1 }
        });

        return {
            success: true,
            plans,
            count: plans.length
        };
    } catch (error) {
        console.error('Error in getPlansByPriceRangeService:', error.message);
        throw new Error('Failed to fetch plans by price range');
    }
};

export const deletePlanService = async (planId) => {
    try {
        const deletedPlan = await planRepository.delete(planId);
        
        if (!deletedPlan) {
            throw new Error('Investment plan not found');
        }

        return {
            success: true,
            message: 'Investment plan deleted successfully',
            plan: deletedPlan
        };
    } catch (error) {
        console.error('Error in deletePlanService:', error.message);
        throw new Error(error.message || 'Failed to delete investment plan');
    }
};

export const getPlansCountService = async () => {
    try {
        const count = await planRepository.count();
        
        return {
            success: true,
            count
        };
    } catch (error) {
        console.error('Error in getPlansCountService:', error.message);
        throw new Error('Failed to get plans count');
    }
};