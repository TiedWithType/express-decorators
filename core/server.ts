import express from 'express';
import cors from 'cors';

interface ServerOptions {
 port?: number;
 useCors?: boolean;
 onStart?: (options?: ServerOptions) => void;
 childRoutes: Function[];
}

export const Server = (options: ServerOptions) =>
 (target: Function): ClassDecorator => {
  class ExpressServer extends target {
   server = express();

   start(): void {
    if (options.useCors) this.server.use(cors());
    
    this.server.use(express.json());

    options.childRoutes.forEach((route) => {
     this.server.use(route.path, route.router);
    });
    
    const callback = () =>
    options.onStart 
    ? options.onStart.call(this, options) : null;
    
    this.server.listen(options.port, callback);
   }
  }

  new ExpressServer().start();
 };
