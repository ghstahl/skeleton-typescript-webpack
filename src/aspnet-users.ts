import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AspNetUserService,IUsersPage} from './services/aspnet-identity-service'
// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);



export class AspNetUsers {
  heading: string = 'AspNet Users';
  page: IUsersPage = null;
  http: HttpClient;

  constructor(@lazy(AspNetUserService) private getAspNetUserService: () => AspNetUserService) {

  }

  async activate(): Promise<void> {
    var that = this;

    var aspNetUserService = this.getAspNetUserService();
    await aspNetUserService.beginPage()
        .then(res => {
          that.page = res;
        });
  }
}
