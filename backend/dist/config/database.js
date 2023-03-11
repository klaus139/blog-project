"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB = process.env.MONGODB_URL;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(MONGODB)
    .then(() => {
    console.log("Connect to MongooDB....");
})
    .catch((err) => {
    console.log(err);
});
