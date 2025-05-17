# express decorators

## most customizable and extensible decorators

#### features

- @Server for zero-config use
- @Route for root paths
- @Get, @Post, @Put, @Patch, @Delete, @All for standard operations
- @Params, @Query, @Body for easy data flow
- Any Server or Route mounts own child routes by passing routes array

#### examples

1. Setup server

```ts
import { Server } from './server';
import { ApiRoute } from './api.route';

@Server({
 childRoutes: [ApiRoute],
 useCors: true,
 port: 8000,
 onStart: (server) => console.log(`Running at port: ${server.port}`),
})
export class AppServer {}
```

2. Setup routes

```ts
import { Route } from './route';
import { Get, Post, Patch, Put, Delete } from './http.methods';
import { Params, Query, Body } from './request.properties';

@Route('/api')
export class ApiRoute {
 @Get('/')
 rootPath() {
  return 'api rootpath';
 }

 @Get('/:id')
 getById(@Params('id') id) {
  return { id, status: 200 };
 }
}
```

#### result

```bash
-> curl "localhost:8000/api"
"api rootpath"

-> curl "localhost:8000/api/1"
{
 "id": "1",
 "status": 200
}
```

##### todo

- implement @Use as middleware
- implement @Headers, etc
