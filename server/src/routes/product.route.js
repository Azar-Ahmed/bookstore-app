import express from "express";
import {getAllProducts, addProducts, updateProducts, deleteProducts, getFilterProducts, getProductDetails} from '../controllers/product.controller.js'
import {isAuthenticated, isAuthorized} from '../middlewares/auth.middleware.js'

const router = express.Router();

// Admin Routes 
router.get('/', isAuthenticated, isAuthorized, getAllProducts)
router.post('/add', isAuthenticated, isAuthorized, addProducts)
router.put('/update/:id', isAuthenticated, isAuthorized, updateProducts)
router.delete('/delete/:id', isAuthenticated, isAuthorized, deleteProducts)


// Public Routes
router.get('/filter', getFilterProducts)
router.get('/:id', getProductDetails)


export default router;