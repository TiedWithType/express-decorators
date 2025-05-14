import express from "express";

export const Server = (props = {}) => target => {
 class ExpressServer extends target {
  port = props.port ?? 3000;
  server = express();
  
  onStart() {
   props.onStart ? props.onStart?.call(this, this)
   : console.log(`@Server port: ${this.port}`)
  }
  
  start() {
   (props.routes ?? []).forEach(route => {
    this.server.use(route.path, route.router)
   })
  
   this.server.use(express.json());
   this.server.listen(this.port, 
   this.onStart.bind(this))
  }
 }
 
 return new ExpressServer().start();
}