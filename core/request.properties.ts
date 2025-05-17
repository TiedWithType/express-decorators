import { DecoratorFactory } from "./decorator.factory";
import { Generator } from './generator';

export class RequestProperties extends DecoratorFactory {
 static config = {
  payloadType: Generator.Type.REQUEST,
  methods: [
   "Params", "Query", "Body"
  ]
 }
}

export const { Params, Query, Body } = RequestProperties.decorators;