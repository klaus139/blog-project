import Category from '../models/Category';
import { createOne, updateOne, getAll, getOne, deleteOne } from './handleFactory';




export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category, 'category');
export const allCategories = getAll(Category);
export const getCategory = getOne(Category, 'category');
export const deleteCategory = deleteOne(Category, 'category');