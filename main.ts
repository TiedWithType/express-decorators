import { Server } from "./server";
import { ApiRoute } from "./api.route";

@Server({
 routes: [ ApiRoute ],
 port: 8000,
 // optional
 onStart: (server) =>
 console.log(`Running at port: ${server.port}`)
}) export class AppServer {}