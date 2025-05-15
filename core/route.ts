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
  
  argsResolver(key, request) {
   return this.request
   .filter(p => p.key === key)
   .reduce((array, {
    type, name, index
   }) => {
    array[index] = (!name
    ? request[type] : request[type][name]) 
    return array;
   }, [])
  }
  
  async callbackResolver({key, request, response}) {
   let args = this.argsResolver(key, request);
   
   console.log(args, key)
   
   try {
    let result = await this[key].apply(this, args);
    response.json(result)
   }
   catch(error) { response.status(500).json({
     err_name: error.name,
     err_message: error.message,
     stack: { args, path: request.originalUrl }
    }
   )}
  }
  
  subRouteResolver({key, path, type}) {
   this.router[type](path, async(request, response) => {
    await this.callbackResolver({
     key, request, response
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