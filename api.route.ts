import { Route } from "./route";
import { Get, Post, Patch, Put, Delete, All } from "./http.methods";
import { Params as Param, Query, Body } from "./request.properties";


@Route("/user")
export class User {
 @Get("/")
 rootPath() {
  return "user rootpath"
 }
 
 @All("/failtest")
 failTest() {
  throw new Error(this.path)
 }
 
 @Get("/:name")
 getByParamName(@Param("name") name) {
  return { path: this.path, name, status: 200 }
 }
}

@Route("/api", {
 childRoutes: [ User ]
})
export class ApiRoute {
 @Get("/")
 rootPath() {
  return "api rootpath"
 }
 
 @All("/failtest")
 failTest() {
  throw new Error(this.path)
 }
 
 @Get("/:name")
 getByParamName(@Param("name") name) {
  return { path: this.path, name, status: 200 }
 }
}