"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const Post_1 = __importDefault(require("./routes/Post"));
const Category_1 = __importDefault(require("./routes/Category"));
const apiError_1 = require("./utils/apiError");
const globalErrorHandler_1 = require("./utils/globalErrorHandler");
require("./config/database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api/', index_1.default);
app.use('/api/auth', Auth_1.default);
app.use('/api/post', Post_1.default);
app.use('/api/categories', Category_1.default);
// 404 error
app.all("*", (req, res, next) => {
    // create error
    const err = new apiError_1.apiError(`Can't find this route ${req.originalUrl}`, 400);
    // send it to Global errors handling middlware
    next(err);
});
// Global Error Handlers Middleware
app.use(globalErrorHandler_1.globalErrHandler);
const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
exports.default = app;
