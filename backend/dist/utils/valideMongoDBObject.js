"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
const mongoose_1 = require("mongoose");
function isValidObjectId(id) {
    if (mongoose_1.Types.ObjectId.isValid(id)) {
        if (String(new mongoose_1.Types.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
exports.isValidObjectId = isValidObjectId;
