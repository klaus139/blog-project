import express from 'express'
import { createCategory, updateCategory, allCategories, getCategory, deleteCategory } from '../controllers/CategoryController';
import { requireSignIn, alowedTo } from '../middleware/authorization';
import { createCategoryValidator, updateCategoryValidator, getCategoryValidator, deleteCategoryValidator } from '../utils/validator/categoryValidator';
const router = express.Router();



router.post(
    "/",
    requireSignIn,
    alowedTo("admin"),
    createCategoryValidator,
    createCategory
  );
  
  // @desc Update Category
  router.put(
    "/:id",
    requireSignIn,
    alowedTo("admin"),
    updateCategoryValidator,
    updateCategory
  );
  
  // @desc get all Categories
  router.get("/", allCategories);
  
  // @desc get a single Category
  router.get("/:id", getCategoryValidator, getCategory);
  
  // @desc Delete a Category
  router.delete(
    "/:id",
    requireSignIn,
    alowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );
  
  
  

export default router;
