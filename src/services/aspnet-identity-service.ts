/**
 * Created by Herb on 9/12/2016.
 */
import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {WebApiInUseSingletonClass} from './web-api-inuse'
// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

export interface IAspNetUser{
    UserName:string;
    EmailConfirmed:boolean;
    Enabled:boolean;

}
export interface IUsersPage {
    PagingState: string;
    CurrentPagingState: string;
    PageSize: number;
    Users: Array<IAspNetUser>;

}
export interface IUserRecord {
    Users: IAspNetUser;
    Roles: Array<string>;
}

export class AspNetUserService {
    heading: string = 'AspNet Users';
    usersPage: IUsersPage = null;
    currentUser:IUserRecord = null;
    http: HttpClient;
    pageNumber: number;
    baseUrl:string;
    constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
        this.pageNumber = 10;
        this.baseUrl = 'http://localhost:31949/api/v1/IdentityAdmin/';
    }
    async getConfiguredHttpClient(): Promise<HttpClient> {

        await fetch;
        const http = this.http = this.getHttpClient();

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.baseUrl);
        });

        return http;
    }
    get canPageNext() {
        return !(!this.usersPage.PagingState || 0 === this.usersPage.PagingState.length);
    }
    async beginPage(): Promise<IUsersPage> {
        var that = this;
        this.usersPage = null;
        await this.nextPage();
        return that.usersPage;
    }
    async nextPage(): Promise<IUsersPage> {
        var that = this;
        var http = await this.getConfiguredHttpClient();

        var path = 'users/page/' + this.pageNumber + '?pagingState=';
        if (this.usersPage) {
            path += encodeURIComponent(this.usersPage.PagingState);
        }
        var inUseManager = WebApiInUseSingletonClass.getInstance();
        inUseManager.increment(1);

        await http.fetch(path)
            .then(res=>{
                return res.json();
            })
            .then(usersPage=>{
                that.usersPage = usersPage;
                console.log(that.usersPage);

            })
            .catch(e=>{
                console.log(e);
                return null;
            })
            .finally(()=>{
                inUseManager.decrement(1);
            });
        return that.usersPage;
    }
    async userById(id:string): Promise<IUserRecord> {
        var that = this;
        var http = await this.getConfiguredHttpClient();

        var path = 'users/id' + '?id=' + id;

        var inUseManager = WebApiInUseSingletonClass.getInstance();
        inUseManager.increment(1);
        var user = null;
        await http.fetch(path)
            .then(res=>{
                return res.json();
            })
            .then(usersPage=>{
                user = usersPage;
                console.log(user);

            })
            .catch(e=>{
                console.log(e);
                return null;
            })
            .finally(()=>{
                inUseManager.decrement(1);
            });
        this.currentUser = user;
        return user;
    }
}