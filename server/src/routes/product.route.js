import express from "express";
import {getAllProducts, addProducts, updateProducts, deleteProducts, getFilterProducts, getProductDetails} from '../controllers/product.controller.js'
import {isAuthenticated, isAuthorized} from '../middlewares/auth.middleware.js'

const router = express.Router();

// Admin Routes 
router.get('/', getAllProducts)
router.post('/add', isAuthenticated, addProducts)
router.put('/update/:id', isAuthenticated, updateProducts)
router.delete('/delete/:id', isAuthenticated, deleteProducts)


// Public Routes
router.get('/filter', getFilterProducts)
router.get('/:id', getProductDetails)


export default router;