import {Router, RouterConfiguration} from 'aurelia-router';

export class ChildRouter {
  router: Router;

  heading = 'Application Administration';

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'aspnet-users'], name: 'aspnet-users',       moduleId: './aspnet-users',       nav: true, title: 'AspNet Users' },
      { route: 'users',         name: 'users',         moduleId: './users',         nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router',  moduleId: './child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
