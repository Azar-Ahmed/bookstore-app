import express from "express";
import {signUp, signIn, signOut, updateProfile, changePassword} from '../controllers/user.controller.js'
import {isAuthenticated} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout', isAuthenticated, signOut)
router.put('/update', isAuthenticated, updateProfile)
router.put('/change-password', isAuthenticated, changePassword)
router.get('/me', isAuthenticated, (req, res) => {
    res.status(200).json({ user: req.user });
})



export default router;