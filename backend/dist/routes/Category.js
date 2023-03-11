"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const authorization_1 = require("../middleware/authorization");
const categoryValidator_1 = require("../utils/validator/categoryValidator");
const router = express_1.default.Router();
router.post("/", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), categoryValidator_1.createCategoryValidator, CategoryController_1.createCategory);
// @desc Update Category
router.put("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), categoryValidator_1.updateCategoryValidator, CategoryController_1.updateCategory);
// @desc get all Categories
router.get("/", CategoryController_1.allCategories);
// @desc get a single Category
router.get("/:id", categoryValidator_1.getCategoryValidator, CategoryController_1.getCategory);
// @desc Delete a Category
router.delete("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), categoryValidator_1.deleteCategoryValidator, CategoryController_1.deleteCategory);
exports.default = router;
