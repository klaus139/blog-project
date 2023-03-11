"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRegister = void 0;
const uuid_1 = require("uuid");
const validation_1 = require("../utils/validation");
const User_1 = __importDefault(require("../models/User"));
const AdminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, password, name, } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        const validateResult = validation_1.registerSchema.validate(req.body, validation_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        //generate salt
        const salt = yield (0, validation_1.GenerateSalt)();
        const adminPassword = yield (0, validation_1.GeneratePassword)(password, salt);
        const Admin = (yield User_1.default.findOne({
            where: { email: email },
        }));
        // create Admin
        if (!Admin) {
            yield User_1.default.create({
                id: uuiduser,
                email,
                password: adminPassword,
                name,
                salt,
                phone,
                verified: true,
                role: "admin"
            });
            //check if the admin exist
            const Admin = (yield User_1.default.findOne({
                where: { email: email },
            }));
            //Generate a signature
            let signature = yield (0, validation_1.GenerateSignature)({
                id: Admin.id,
                email: Admin.email,
                verified: Admin.verified,
            });
            return res.status(201).json({
                message: "admin created successfully",
                signature,
                verified: Admin.verified,
                role: Admin.role
            });
        }
        return res.status(400).json({
            message: "admin already exist",
        });
    }
    catch (err) {
        ///console.log(err.name)
        console.log(err.message);
        // console.log(err.stack)
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/create-super-admin",
        });
    }
});
exports.AdminRegister = AdminRegister;
