import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {WebApiInUseSingletonClass} from './services/web-api-inuse'
export class App {
  router: Router;
  api: WebApiInUseSingletonClass;

  constructor( ) {
    this.api = WebApiInUseSingletonClass.getInstance();

  }
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      { route: 'aspnet-users',         name: 'aspnet-users',        moduleId: './aspnet-users',        nav: true, title: 'AspNet Users' },
      { route: 'aspnet-user-details/:id',     name: 'aspnet-user-details',        moduleId: './aspnet-user-details',        nav: false, title: 'AspNet Users Details' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}


