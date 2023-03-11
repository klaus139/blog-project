import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import slugify from "slugify";
import { validatorResult } from "../../middleware/validatorMiddleware";

export const createCategoryValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .custom((title, { req }) => {
      req.body.slug = slugify(title.toLowerCase());
      req.body.user = req.user._id;
      return true;
    }),

  validatorResult,
];

export const getCategoryValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Category id format`);
    }
    return true;
  }),

  validatorResult,
];

export const updateCategoryValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .custom((title, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Category id format`);
      }

      req.body.slug = slugify(title.toLowerCase());
      req.body.user = req.user._id;
      return true;
    }),

  validatorResult,
];

export const deleteCategoryValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Category id format`);
    }
    return true;
  }),

  validatorResult,
];
