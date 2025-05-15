import { Server } from "./server";
import { ApiRoute } from "./api.route";

@Server({
 childRoutes: [ ApiRoute ],
 port: 8000,
 onStart: (server) =>
 console.log(`Running at port: ${server.port}`)
}) export class AppServer {}