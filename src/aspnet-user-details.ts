import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AspNetUserService,IUserRecord} from './services/aspnet-identity-service'
// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);



export class AspNetUsersDetails {
  heading: string = 'AspNet Users';
  user: IUserRecord = null;
  http: HttpClient;

  constructor(@lazy(AspNetUserService) private getAspNetUserService: () => AspNetUserService) {

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
