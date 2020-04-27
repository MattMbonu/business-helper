"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 300 },
    email: { type: String, required: true, maxlength: 300, unique: true },
    password: { type: String, required: true, minlength: 6, maxlength: 300 },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "root"],
    },
    date: { type: String, required: true, default: Date.now() },
});
userSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("User", userSchema);
