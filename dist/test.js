"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var _1 = __importDefault(require("."));
var app = express_1.default();
app.use(_1.default);
app.get('/', function (req, res) {
    throw new Error();
});
app.listen(8081);
