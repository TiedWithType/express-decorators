export class Generator {
 static Payload({ target, name, value }) {
  let prev = Reflect.get(target ?? {}, name) ?? [];
  Reflect.set(target ?? {}, name, [...prev, value]);
 }
}