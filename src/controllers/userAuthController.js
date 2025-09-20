import asyncHandler from "../middlewares/asyncHandler.js";
import {
  signInUser,
  signUpUser,
} from "../services/userAuthServices.js";
import { verifyToken } from "../utils/tokenUtils.js";
import { getUserProfile } from './../services/userAuthServices.js';


export const signup = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    console.log('register triggered', req.body )

    if (!name || !email || !password) throw new Error("Please fill all the inputs.");

    try {
        const userData = await signUpUser(name, email, password);

        res.status(201).json(userData)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export const login = asyncHandler( async(req, res) => {
    const { email, password} = req.body;
    console.log('Login details', email, password);
    

    if (!email || !password) throw new Error("Please fill all the inputs.");

    try {
       const userData = await signInUser(email, password);
  
      res.status(200).json(userData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export const handleVerifyToken = asyncHandler(async(req, res) => {
    console.log('hit verify');
    
    try {
        const token = req.headers["authorization"]?.split(' ')[1];;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const result = await verifyToken(token);
        console.log('User profile:', result); 
        res.status(200).json({
            message: 'Token is valid',
            user: result.user
        })
    } catch (error) {
        console.error('Error fetching user profile:', error);        
        res.status(401).json({ message: error.message })
    }
})

export const getProfile = asyncHandler(async(req, res) => {
    
    const userId = req.user?.id;
    
    if(!userId) {
        return res.status(401).json({ error: 'Unauthorized: user not logged in.'})
    }

    try {
        const userProfile = await getUserProfile(userId);
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the user profile.' });
    }
})

export const logout = asyncHandler(async(req, res) =>{
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({ message: "Already logged out" });
    }

    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out sccessfully"})
})

export const updateProfile = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const updateData = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: user not logged in.'})
    }

    try {
        const updatedUser = await updateUserProfile(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error: error.message})
    }
})