import express from 'express';
import { loginUser,registerUser,adminLogin, getUserList, deleteUserById, getProfileUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
// User management routes
userRouter.get('/users', getUserList); // Get list of all users
userRouter.delete('/users/:id', deleteUserById); // Delete user by ID
userRouter.post('/profile-detail',getProfileUser)



export default userRouter;