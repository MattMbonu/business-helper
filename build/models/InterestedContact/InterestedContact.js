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
var interestedContact = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 250 },
    approxAge: { type: Number, min: 0, max: 110 },
    description: { type: String, maxlength: 7000 },
    additionalInfo: { type: String, maxlength: 7000 },
});
exports.default = mongoose_1.default.model("InterestedContact", interestedContact);
