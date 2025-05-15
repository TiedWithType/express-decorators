import { Generator } from "./generator";

export class HttpMethods {
 static methods = [
  "Get", "Post", "Put", "Patch", "Delete", "All"
 ];
 
 static createMethod = name => path =>
 (target, propertyKey, descriptor) => {
  Generator.Payload({
   name: Generator.Type.METHOD,
   target,
   value: {
    type: name.toLowerCase(),
    path: path,
    callback: descriptor.value,
   }
  })
 }
 
 static get decorators() {
  return this.methods.reduce((array, method) => {
   array[method] = this.createMethod(method);
   return array;
  }, {})
 }
}

export const { Get, Post, Put, Patch, Delete, All } = HttpMethods.decorators;