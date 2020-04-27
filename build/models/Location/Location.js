"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var locationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 200 },
    description: { type: String, maxlength: 5000 },
    type: {
        type: String,
        required: true,
        enum: ["gasstation", "business", "other"],
    },
    address: { type: String, required: true },
    coordinates: {
        lat: { type: Number },
        long: { type: Number },
    },
});
exports.default = mongoose_1.default.model("Location", locationSchema);
