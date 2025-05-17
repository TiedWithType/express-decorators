import { DecoratorFactory } from "./decorator.factory";
import { Generator } from './generator';

export class HttpMethods extends DecoratorFactory {
 static config = {
  payloadType: Generator.Type.METHOD,
  methods: [
   "Get", "Post", "Put", "Patch", "Delete", "All"
  ]
 }
}

export const { Get, Post, Put, Patch, Delete, All } = HttpMethods.decorators;