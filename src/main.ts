import { Server } from '@/decorators';
import { ApiRoute } from './api.route';

@Server({
 childRoutes: [ ApiRoute ],
 useCors: true,
 port: 8000,
 onStart: ({ port }: number): void =>
  console.log(`
  Running server at http://localhost:${port}
 `.trim())
})
export class AppServer {}
