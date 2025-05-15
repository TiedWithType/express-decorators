import express from "express";
import { Generator } from "./generator";

export const Route = (path, { childRoutes } = {}) => target => {
 class ExpressRoute extends target {
  router = express.Router();
  
  constructor(...args) {
   super(...args);
   
   this.methods = Generator.get({
    name: Generator.Type.METHOD,
    target: this
   });
   
   this.request = Generator.get({
    name: Generator.Type.REQUEST,
    target: this
   })  
   
   this.path = path;
   this.routeResolver();
  }
  
  argsResolver(request) {
   return this.request.reduce((array, {
    type, name, index
   }) => {
    array[index] = (!name
    ? request[type] : request[type][name]) 
    return array;
   }, [])
  }
  
  callbackResolver({callback, request, response}) {
   let args = this.argsResolver(request);

   try {
    let result = callback.apply(this, args);
    response.json(result)
   }
   catch(error) { response.status(500).json({
     err_name: error.name,
     err_message: error.message,
     stack: { args, path: request.originalUrl }
    }
   )}
  }
  
  subRouteResolver({callback, path, type}) {
   this.router[type](path, (request, response) => {
    this.callbackResolver({
     callback, request, response
    })
   })
  }
  
  routeResolver() {
   childRoutes?.forEach(route => {
    this.router.use(route.path, route.router)
   });
   
   this.methods.map(method => {
    this.subRouteResolver(method)
   });
  }
 }
 
 return new ExpressRoute();
}