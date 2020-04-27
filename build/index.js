"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var HttpError_1 = __importDefault(require("./models/HttpError/HttpError"));
//#region router-imports
//#endregion router-imports
//#region App setup
dotenv_1.default.config();
var app = express_1.default();
app.use(express_1.default.json());
//#endregion
//#region routes
//#endregion routes
//#region Not Found
app.use(function (req, res, next) {
    next(new HttpError_1.default("Could not find this route.", 404));
});
//#endregion
//#region error handling
app.use(function (error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    return res
        .status(error.code || 500)
        .json({ message: error.message || "an unknown error occured" });
});
//#endregion error handling
//#region Server Initialization
mongoose_1.default
    .connect(process.env.DB_CONNECTION_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(function () {
    mongoose_1.default.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < names.length; i++) {
                console.log(names[i].name);
            }
        }
    });
    var PORT = process.env.PORT || 5000;
    app.listen(PORT, function () { return console.log("app running on port " + PORT); });
})
    .catch(function (error) {
    console.log(error);
    process.exit(1);
});
//#endregion Server Initialization
