// src/services/userAuthServices.js (Refactored)
import userRepository from "../repositories/userRepository.js";
import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { generateToken } from "../utils/tokenUtils.js";

export const signUpUser = async (name, email, password, role = ['investor'], phoneNumber = null) => {
    try {
        // Check if user already exists using repository
        const userExists = await userRepository.findByEmail(email);
        if (userExists) {
            throw new Error('User already exists');
        }

        // Business logic validation for roles
        const validRoles = ['investor', 'expert', 'admin'];
        const invalidRoles = role.filter(r => !validRoles.includes(r));
        if (invalidRoles.length > 0) {
            throw new Error(`Invalid roles: ${invalidRoles.join(', ')}`);
        }

        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // Create user object
        const userData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role,
            phoneNumber,
            isAdmin: role.includes('admin')
        };

        // Create user using repository
        const newUser = await userRepository.create(userData);

        // Generate token
        const token = generateToken(newUser._id, newUser.isAdmin);

        return {
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isAdmin: newUser.isAdmin,
                isVerified: newUser.isVerified,
                phoneNumber: newUser.phoneNumber
            },
        };
    } catch (error) {
        console.error('Error in registerService:', error.message);
        throw new Error(error.message || 'An error occurred during registration');
    }
};

export const signInUser = async (email, password) => {
    try {
        // Find user with populated fields using repository
        const populateOptions = [
            { path: 'investmentPlan', select: 'name priceRange duration expectedReturn' },
            { path: 'subscribedExpert', select: 'name email expertise' },
            { path: 'subscribers', select: 'name email' }
        ];

        const existingUser = await userRepository.findByEmail(email, populateOptions);

        if (!existingUser) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate token
        const token = generateToken(existingUser._id, existingUser.isAdmin);

        return {
            success: true,
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                isAdmin: existingUser.isAdmin,
                isVerified: existingUser.isVerified,
                phoneNumber: existingUser.phoneNumber,
                investmentPlan: existingUser.investmentPlan,
                subscribedExpert: existingUser.subscribedExpert,
                subscribers: existingUser.subscribers,
                bio: existingUser.bio,
                expertise: existingUser.expertise
            },
        };
    } catch (error) {
        console.error('Error during loginService:', error.message);
        throw new Error(error.message || 'Internal server error');
    }
};

export const getUserProfile = async (userId) => {
    try {
        const populateOptions = [
            { path: 'investmentPlan', select: 'name priceRange duration expectedReturn' },
            { path: 'subscribedExpert', select: 'name email expertise bio' },
            { path: 'subscribers', select: 'name email' }
        ];

        const user = await userRepository.findById(userId, populateOptions);

        if (!user) {
            throw new Error('User not found');
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user.toObject();

        return {
            success: true,
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Error in getCurrentUserService:', error.message);
        throw new Error(error.message || 'Failed to fetch user profile');
    }
};

export const updateUserProfile = async (userId, updateData) => {
    try {
        // Remove sensitive fields that shouldn't be updated directly
        const { password, isAdmin, _id, ...allowedUpdates } = updateData;

        // Business logic validation for roles
        if (allowedUpdates.role) {
            const validRoles = ['investor', 'expert', 'admin'];
            const invalidRoles = allowedUpdates.role.filter(r => !validRoles.includes(r));
            if (invalidRoles.length > 0) {
                throw new Error(`Invalid roles: ${invalidRoles.join(', ')}`);
            }
        }

        const populateOptions = [
            { path: 'investmentPlan', select: 'name priceRange duration expectedReturn' },
            { path: 'subscribedExpert', select: 'name email expertise bio' },
            { path: 'subscribers', select: 'name email' }
        ];

        const updatedUser = await userRepository.update(
            userId, 
            allowedUpdates, 
            { 
                populate: populateOptions,
                runValidators: true 
            }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        // Remove password from response
        const { password: pwd, ...userWithoutPassword } = updatedUser.toObject();

        return {
            success: true,
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Error in updateCurrentUserProfile:', error.message);
        throw new Error(error.message || 'Failed to update user profile');
    }
};

export const updateUserPassword = async (userId, currentPassword, newPassword) => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        // Hash new password
        const hashedNewPassword = await hashPassword(newPassword);
        
        // Update password using repository
        await userRepository.update(userId, { password: hashedNewPassword });

        return {
            success: true,
            message: 'Password updated successfully'
        };
    } catch (error) {
        console.error('Error in changePasswordService:', error.message);
        throw new Error(error.message || 'Failed to change password');
    }
};

export const subscribeToExpert = async (userId, expertId) => {
    try {
        // Verify expert exists and has expert role using repository
        const expert = await userRepository.findById(expertId);
        if (!expert || !expert.role.includes('expert')) {
            throw new Error('Expert not found or invalid expert ID');
        }

        // Update user's subscribed experts using repository
        const populateOptions = { 
            path: 'subscribedExpert', 
            select: 'name email expertise bio' 
        };

        const user = await userRepository.addToArray(
            userId, 
            'subscribedExpert', 
            expertId, 
            populateOptions
        );

        // Update expert's subscribers using repository
        await userRepository.addToArray(expertId, 'subscribers', userId);

        return {
            success: true,
            message: 'Successfully subscribed to expert',
            subscribedExpert: user.subscribedExpert
        };
    } catch (error) {
        console.error('Error in subscribeToExpertService:', error.message);
        throw new Error(error.message || 'Failed to subscribe to expert');
    }
};

export const unsubscribeFromExpert = async (userId, expertId) => {
    try {
        // Update user's subscribed experts using repository
        const populateOptions = { 
            path: 'subscribedExpert', 
            select: 'name email expertise bio' 
        };

        const user = await userRepository.removeFromArray(
            userId, 
            'subscribedExpert', 
            expertId, 
            populateOptions
        );

        // Update expert's subscribers using repository
        await userRepository.removeFromArray(expertId, 'subscribers', userId);

        return {
            success: true,
            message: 'Successfully unsubscribed from expert',
            subscribedExpert: user.subscribedExpert
        };
    } catch (error) {
        console.error('Error in unsubscribeFromExpertService:', error.message);
        throw new Error(error.message || 'Failed to unsubscribe from expert');
    }
};

// Additional service methods that leverage the repository layer

export const listExperts = async () => {
    try {
        const experts = await userRepository.findByRole('expert', {
            path: 'subscribers',
            select: 'name email'
        });

        // Remove passwords from response
        const expertsWithoutPasswords = experts.map(expert => {
            const { password, ...expertWithoutPassword } = expert.toObject();
            return expertWithoutPassword;
        });

        return {
            success: true,
            experts: expertsWithoutPasswords,
            count: experts.length
        };
    } catch (error) {
        console.error('Error in getAllExpertsService:', error.message);
        throw new Error('Failed to fetch experts');
    }
};

export const listUsersByRole = async (role) => {
    try {
        const validRoles = ['investor', 'expert', 'admin'];
        if (!validRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        const users = await userRepository.findByRole(role);

        // Remove passwords from response
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        return {
            success: true,
            users: usersWithoutPasswords,
            count: users.length
        };
    } catch (error) {
        console.error('Error in getUsersByRoleService:', error.message);
        throw new Error('Failed to fetch users by role');
    }
};

export const listUsersWithPlan = async (planId) => {
    try {
        const users = await userRepository.findByInvestmentPlan(planId, {
            path: 'investmentPlan',
            select: 'name priceRange duration expectedReturn'
        });

        // Remove passwords from response
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        return {
            success: true,
            users: usersWithoutPasswords,
            count: users.length
        };
    } catch (error) {
        console.error('Error in getUsersWithPlanService:', error.message);
        throw new Error('Failed to fetch users with investment plan');
    }
};