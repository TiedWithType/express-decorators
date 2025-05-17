import { Route, Get, Post, Patch, Put, Delete, All, Params, Query, Body } from '@/decorators';

@Route('/api')
export class ApiRoute {
 @Get("/")
 rootPath() {
  return "api rootpath"
 }
 
 @Get("/id/:id")
 getId(@Params("id") id) {
  return id;
 }
 
 @Get("/all/:id")
 getAllId(@Params() all) {
  return all;
 }
}
