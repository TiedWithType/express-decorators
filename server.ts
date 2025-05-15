import express from "express";

export const Server = ({ port, onStart, childRoutes } = {}) => target => {
 class ExpressServer extends target {
  port = port ?? 3000;
  server = express();
  
  onStart() {
   onStart ? onStart.call(this, this)
   : console.log(`@Server port: ${this.port}`)
  }
  
  start() {
   childRoutes?.forEach(route => {
    this.server.use(route.path, route.router)
   });
  
   this.server.use(express.json());
   this.server.listen(this.port, 
   this.onStart.bind(this))
  }
 }
 
 return new ExpressServer().start();
}