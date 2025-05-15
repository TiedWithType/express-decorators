import { Server } from "@/decorators";
import { ApiRoute } from "./api.route";

@Server({
 childRoutes: [ ApiRoute ],
 useCors: true,
 port: 8000,
 onStart: (server) =>
 console.log(`Running at port: ${server.port}`)
}) export class AppServer {}