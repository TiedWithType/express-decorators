import { Route } from "./route";
import { Get, Post, Patch, Put, Delete } from "./http.methods";
import { Params, Query, Body } from "./request.properties";

@Route("/api")
export class ApiRoute {
 @Get("/")
 rootPath() {
  return "api rootpath"
 }
 
 @Get("/:name")
 getByParamName(@Params("name") name) {
  return { name, status: 200 }
 }
}