export class Generator {
 static Type = {
  REQUEST: Symbol("Request_Object"),
  METHOD: Symbol("Methods"),
  MIDDLEWARE: Symbol("Middleware_Object")
 }
 
 static get({ target, name }) {
  return Reflect.get(target ?? {}, name ?? "") ?? [];
 }
 
 static Payload({ target, name, value }) {
  let prev = Generator.get({ target, name });
  Reflect.set(target ?? {}, name, [...prev, value]);
 }
}