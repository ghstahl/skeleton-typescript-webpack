import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {WebApiInUseSingletonClass} from './services/web-api-inuse'
// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

export class Users {
  heading: string = 'Github Users';
  users: Array<IUser> = [];
  http: HttpClient;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async activate(): Promise<void> {
    var that = this;
    var inUseManager = WebApiInUseSingletonClass.getInstance();
    inUseManager.increment(1);

    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    await http.fetch('users')
        .then(response => response.json())
        .then(data => {
          that.users = data;
          console.log(data);
        })
        .finally(()=>{
          inUseManager.decrement(1);
        });
  }
}
