import { Generator } from "./generator";

export class RequestProperties {
 static methods = [
  "Params", "Query", "Body"
 ];
 
 static createProperty = name => identifier =>
 (target, propertyKey, propertyIndex) => {
  Generator.Payload({
   name: "request",
   target,
   value: {
    type: name.toLowerCase(),
    name: identifier,
    index: propertyIndex
   }
  })
 }
 
 static get decorators() {
  return this.methods.reduce((array, property) => {
   array[property] = this.createProperty(property);
   return array;
  }, {})
 }
}

export const { Params, Query, Body } = RequestProperties.decorators;