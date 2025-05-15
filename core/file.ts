import { readFile, writeFile, unlink, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { join, resolve } from "node:path";
import { parse, stringify } from "json5";
import { dirname } from "node:path";

export const read = async src => {
 try {
  let buffer = await readFile(src, "utf-8");
  return parse(buffer, null, 1);
 } catch(error) {
  throw new Error(error);
 }
}

export const write = async (src, data) => {
 try {
  const dir = dirname(src);
  data = stringify(data, null, 1);
  
  await mkdir(dir, { recursive: true });
  await writeFile(src, data, "utf-8");
 } catch (error) {
  throw new Error(error);
 }
};

export const remove = async src => {
 try {
  await access(src, constants.F_OK);
  await unlink(src);
 } catch(error) {
  throw new Error(error);
 }
}