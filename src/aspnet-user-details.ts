import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AspNetUserService,IUserRecord} from './services/aspnet-identity-service'
// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);



export class AspNetUsersDetails {
  constructor(@lazy(AspNetUserService) private getAspNetUserService: () => AspNetUserService) {}

  heading: string = 'AspNet Users';
  user: IUserRecord = null;
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
          that.user = res.User;
        });

  }
}
export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}