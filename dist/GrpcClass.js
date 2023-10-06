"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcClass = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const path_1 = __importDefault(require("path"));
const proto_loader_1 = require("@grpc/proto-loader");
const server_1 = require("./server");
// import { driver_controller } from "../controllers/driver.controller";
class GrpcClass {
    constructor() {
        this.protoFilePath = path_1.default.join(__dirname, `../protos/product.proto`);
        this.grpcCallback = (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            this.grpcServer.start();
            console.log(`gRPC server listening on ${port}`);
        };
        console.log("cons called");
        this.startGrpcServer();
    }
    startGrpcServer() {
        this.loadGRPC();
        this.grpcServer = new grpc_js_1.Server();
        this.loadServiceDefinition();
        console.log("stage2");
        this.initServer();
        console.log("stage3");
    }
    loadGRPC() {
        try {
            const packageDef = (0, proto_loader_1.loadSync)(path_1.default.resolve(__dirname, this.protoFilePath), {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true,
            });
            const grpcObject = (0, grpc_js_1.loadPackageDefinition)(packageDef);
            console.log("ggrrr", grpcObject);
            this.product = grpcObject.product;
            console.log("pdd", this.product);
        }
        catch (err) {
            console.log(err);
        }
    }
    loadServiceDefinition() {
        this.loadService(this.grpcServer, this.product);
    }
    loadService(grpcServer, product) {
        console.log("pro", product);
        grpcServer.addService(product.ProductService.service, {
            GetProduct: server_1.Controller.getProductGrpc,
        });
    }
    initServer() {
        this.grpcServer.bindAsync(`0.0.0.0:7000`, grpc_js_1.ServerCredentials.createInsecure(), this.grpcCallback);
    }
}
exports.GrpcClass = GrpcClass;
//# sourceMappingURL=GrpcClass.js.map