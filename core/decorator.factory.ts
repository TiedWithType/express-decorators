import { Generator } from './generator';

type Decorators = Record<string, MethodDecorator>;

interface FactoryConfig {
 payloadType: symbol | string;
 methods: string[];
}

export abstract class DecoratorFactory {
 static config: FactoryConfig = {};

 static createMethod = (
  payloadType: string, type: string) =>
 (name: string) =>
 (target: Object, key: string, index: number)
 : void => {
  const value = { name, key, index };

  Generator.Payload({
   name: payloadType,
   value: { ...value, type: type.toLowerCase() },
   target
  });
 };
 
 static get decorators(): Decorators {
  const { payloadType, methods } = this.config;
  
  return methods.reduce((array, method) => {
   array[method] =
   this.createMethod(payloadType, method);
   return array;
  }, {} as Decorators);
 }
}