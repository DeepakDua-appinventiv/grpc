import grpc, {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import path from "path";
import { PackageDefinition, loadSync } from "@grpc/proto-loader";
import { Controller } from "./server";
// import { driver_controller } from "../controllers/driver.controller";


export class GrpcClass {
  private protoFilePath = path.join(
    __dirname,
    `../protos/product.proto`
  );

  public product: any;
  public grpcServer!: Server;

  constructor() {
    console.log("cons called")
    this.startGrpcServer();
  }

  private startGrpcServer() {
    this.loadGRPC();
    this.grpcServer = new Server();
    this.loadServiceDefinition();
    console.log("stage2")
    this.initServer();
    console.log("stage3")
  }

  private loadGRPC() {
    try {
      const packageDef: PackageDefinition = loadSync(
        path.resolve(__dirname, this.protoFilePath),
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }
      );
      const grpcObject = loadPackageDefinition(packageDef);
      console.log("ggrrr",grpcObject)
      this.product = grpcObject.product;
      console.log("pdd",this.product)

      
    } catch (err) {
      console.log(err);
    }
  }

  private loadServiceDefinition() {
    this.loadService(this.grpcServer, this.product);
  }

  public loadService(grpcServer: Server, product: any) {
    console.log("pro",product)
    grpcServer.addService(product.ProductService.service, {
        
        GetProduct: Controller.getProductGrpc,
    });
  }

  private initServer() {
    this.grpcServer.bindAsync(
      `0.0.0.0:7000`,
      ServerCredentials.createInsecure(),
      this.grpcCallback
    );
  }

  private grpcCallback = (err: Error | null, port: number): void => {
    if (err) {
      console.error(err);
      return;
    }
    this.grpcServer.start();
    console.log(`gRPC server listening on ${port}`);
  };
}
