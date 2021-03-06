import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router, RouterConfiguration} from 'aurelia-router';
import {AspNetUserService,IUserRecord} from './services/aspnet-identity-service'
import {DialogService} from 'aurelia-dialog';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);



export class AspNetUsersDetails {
  constructor(@lazy(AspNetUserService) private getAspNetUserService: () => AspNetUserService,
              @lazy(DialogService)     private getDialogService: () => DialogService) {
    this.dialogService = this.getDialogService();
  }

  router: Router;
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'roles'], name: 'roles',       moduleId: './roles',       nav: true, title: 'Roles' },
    ]);

    this.router = router;
  }
  dialogService: DialogService;
  heading: string = 'AspNet Users';
  user: IUserRecord;
  http: HttpClient;
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }


  async activate(params) : Promise<void> {

    var that = this;

    var aspNetUserService = this.getAspNetUserService();
    await aspNetUserService.userById(params.id)
        .then(res => {
          that.user = res;
        });

  }
}
export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}