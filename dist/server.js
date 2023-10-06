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
exports.Controller = void 0;
const express_1 = __importDefault(require("express"));
const GrpcClass_1 = require("./GrpcClass");
const app = (0, express_1.default)();
const port = 3002;
app.get('/getProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ "pid": "p1", "name": "Iphone" });
}));
class Controller {
    static getProductGrpc(req, res) {
        console.log("grpc controller okk");
        const pd = ({ "pid": "p1", "name": "Iphone" });
        res(null, { pd });
    }
}
exports.Controller = Controller;
const grpc = new GrpcClass_1.GrpcClass();
app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map