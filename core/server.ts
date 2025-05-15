import express from "express";
import cors from "cors";

export const Server = ({ port, onStart, childRoutes, useCors } = {}) => target => {
 class ExpressServer extends target {
  port = port ?? 3000;
  server = express();
  
  onStart() {
   onStart ? onStart.call(this, this, port)
   : console.log(`@Server port: ${this.port}`)
  }
  
  start() {
   this.server.use(express.json());
   
   useCors ?? this.server.use(cors())
  
   childRoutes?.forEach(route => {
    this.server.use(route.path, route.router)
   });
  
   this.server.listen(this.port, 
   this.onStart.bind(this))
  }
 }
 
 return new ExpressServer().start();
}