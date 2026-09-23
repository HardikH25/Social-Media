import express from 'express'
import { getUser, loginUser, registerUser, getUserProfile, followUser,unFollowUser } from '../controllers/user.controllers.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const userRouter = express.Router()


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)
userRouter.get('/me', isAuthenticated, getUser) //isAuthenticated is a middleware and not a controller
//lets the user authentucate and pass successfully 
userRouter.get('/profile/:username',isAuthenticated,getUserProfile) //isAuthenticated is a middleware and not a controller
//only letting logged in users to access the profile page

//followings and followers
userRouter.post('/follow/:id', isAuthenticated, followUser)
userRouter.post('/unfollow/:id', isAuthenticated, unFollowUser)

export default userRouter
