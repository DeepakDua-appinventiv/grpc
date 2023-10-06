
import express from 'express';
import { GrpcClass } from './GrpcClass';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';

const app = express();
const port = 3002;

app.get('/getProduct', async (req, res) => {
  res.send({"pid":"p1","name":"Iphone"})
});

export class Controller {
  static getProductGrpc(req: ServerUnaryCall<any, any>, res: sendUnaryData<any>){
    console.log("grpc controller okk")
    const pd = ({"pid":"p1","name":"Iphone"})
    res(null, { pd })
  }
}
const grpc = new GrpcClass();

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
  
});

