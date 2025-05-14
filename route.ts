import express from "express";

export const Route = (path, props) => target => {
 class ExpressRoute extends target {
  router = express.Router();
  
  constructor(...args) {
   super(...args);
   this.path = path;
   this.routeResolver();
  }
  
  argsResolver(request) {
   return Array.from(this.request ?? [])
   .reduce((array, {
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
     name: error.name,
     message: error.message,
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
   ((props ?? {}).routes ?? []).forEach(route => {
    this.router.use(route.path, route.router)
   });
   
   Array.from(this.methods ?? []).map(method => {
    this.subRouteResolver(method)
   });
  }
 }
 
 return new ExpressRoute();
}