import { Route, Get, Post, Patch, Put, Delete, All, Params, Query, Body } from "@/decorators";
import { read, write, remove } from "@core/file";

@Route("/api")
export class ApiRoute {
 @All("/")
 protectRootPath() {
  return "bad request :(";
 }

 @Get("/{*src}")
 async readFile(@Params("src") src) {
  try {
   const result = await read(src.join("/"));
   return result ?? "error";
  } catch {
   return "error";
  }
 }

 @Post("/{*src}")
 async addFile(@Params("src") src, @Body() data) {
  try {
   await write(src.join("/"), data);
   return "success";
  } catch {
   return "error";
  }
 }

 @Patch("/{*src}")
 async patchFile(@Params("src") src, @Body() data) {
  try {
   const prev = await read(src.join("/"));
   const newContent = { ...prev, ...data };
   await write(src.join("/"), newContent);
   return "success";
  } catch {
   return "error";
  }
 }

 @Delete("/{*src}")
 async removeFile(@Params("src") src) {
  try {
   await remove(src.join("/"));
   return "success";
  } catch {
   return "error";
  }
 }
}