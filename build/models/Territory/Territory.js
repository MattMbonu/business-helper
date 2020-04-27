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
var territorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 300 },
    description: { type: String, maxlength: 3000 },
    assignee: { type: String, maxlength: 200 },
    addresses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Location", required: true }],
});
exports.default = mongoose_1.default.model("Territory", territorySchema);
