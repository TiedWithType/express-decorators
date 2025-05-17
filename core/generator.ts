export interface MetaOptions {
 target: Function;
 name: symbol | string;
 value: any;
}

export class Generator {
 static Type = {
  REQUEST: Symbol('REQUEST'),
  METHOD: Symbol('METHOD'),
  MIDDLEWARE: Symbol('MIDDLEWARE'),
 };
 
 static parseValue(value: any): any[] {
  return Array.isArray(value)
  ? [...value] : [value];
 }

 static get(options: MetaOptions): any[] {
  const { target, name } = options;
  const value = Reflect.get(target, name);
  
  return value ?? [];
 }
 
 static set(options: MetaOptions): void {
  const { target, name, value } = options;
  
  Reflect.set(target, name, this.parseValue(value));
 }

 static Payload(options: MetaOptions): void {
  const { value } = options;
  const prev = this.get(options);
  
  this.set({ ...options, value: [...prev, value] });
 }
}