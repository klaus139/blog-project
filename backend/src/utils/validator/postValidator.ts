import { body, validationResult } from "express-validator";
import {validatorResult} from "../../middleware/validatorMiddleware";
import { isValidObjectId } from "../valideMongoDBObject";
import Category from '../../models/Category';


export const createPostValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .isLength({ max: 200 })
    .withMessage(
      "title length must be less than or equal to 200 characters long"
    )
    .isLength({ min: 5 })
    .withMessage("title length must be at least 5 characters long"),
  body("body")
    .notEmpty()
    .withMessage("description is not allowed to be empty")
    .isLength({ max: 5000 })
    .withMessage(
      "title length must be less than or equal to 5000 characters long"
    ),
  body("category")
    .notEmpty()
    .withMessage("category is not allowed to be empty")
    .custom(async (value: any, { req }: any) => {
      if (!isValidObjectId(value)) {
        throw new Error(`Invalid Category id format`);
      }

      // Check if category found
      const category = await Category.findById(value);
      if (!category) {
        throw Error(`No category for this id ${value}`);
      }
    }),

  validatorResult,
];


export const updatePostValidator = [
    body("id").custom((value, { req })  => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Post id format`);
      }
      return true;
    }),
  
    body("title")
      .optional()
      .isLength({ max: 20 })
      .withMessage(
        "title length must be less than or equal to 20 characters long"
      )
      .isLength({ min: 2 })
      .withMessage("title length must be at least 2 characters long"),
    body("description")
      .optional()
      .isLength({ min: 2 })
      .withMessage("description length must be at least 2 characters long")
      .isLength({ max: 600 })
      .withMessage(
        "description length must be less than or equal to 600 characters long"
      ),
  
    validatorResult,
  ];
  
  export const removePostValidator = [
    body("id").custom((value, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Post id format`);
      }
      return true;
    }),
  
    validatorResult,
  ];
  
  export const getPostValidator = [
    body("id").custom((value, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Post id format`);
      }
      return true;
    }),
  
    validatorResult,
  ];
  