import {lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AspNetUserService,IUserRecord} from './services/aspnet-identity-service'
import {DialogService} from 'aurelia-dialog';
import {Prompt} from './common-dialogs/prompt';
import {InfoPrompt} from './common-dialogs/info-prompt';
import{CommonDialogs} from './common-dialogs/common-dialogs'
import {AddRoleDialog} from './add-role-dialog';
export class Welcome {
  constructor(@lazy(AspNetUserService) private getAspNetUserService: () => AspNetUserService,
              @lazy(DialogService)     private getDialogService: () => DialogService,
              @lazy(CommonDialogs)     private getCommonDialogs: () => CommonDialogs
) {
    this.dialogService = this.getDialogService();
    this.commonDialogs = this.getCommonDialogs();
  }

  commonDialogs: CommonDialogs;
  dialogService: DialogService;
  userRecord:IUserRecord = null;
  heading: string = 'Roles to the Aurelia Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;
  availableRoles:string[];

  filteredAvailableRoles:string[];
  areRolesAvailable:boolean = false;

  async activate(params) : Promise<void> {
    var that = this;
    var aspNetUserService = this.getAspNetUserService();
    this.userRecord = aspNetUserService.currentUser;
    this.availableRoles = ["Administrator","Developer"];
    this.recalcFilteredRoles();
    console.log(this.userRecord);
  }

  recalcFilteredRoles(){
    this.filteredAvailableRoles =  this.availableRoles.filter((item) => {
      var arraycontainsturtles = (this.userRecord.Roles.indexOf(item) > -1);
      return !arraycontainsturtles;
    });
    this.areRolesAvailable = this.filteredAvailableRoles.length>0;
  }

  deleteRole(role:string) {
    this.dialogService.open(
        { viewModel: Prompt, model: 'Are you sure you want to delete the following role: ' + role +'?'})
        .then((result) => {
      if (!result.wasCancelled) {
        console.log('good');
        console.log(result.output);
      } else {
        console.log('bad');
      }
    });
  }
  addRole() {

    var availableRoles = ["Administrator","Developer"];

    this.dialogService.open(
        { viewModel: AddRoleDialog, model: {availableRoles:availableRoles,currentUsersRoles:this.userRecord.Roles}})
        .then((result) => {
          if (!result.wasCancelled) {
            console.log('good');
            console.log(result.output);
          } else {
            console.log('bad');
          }
        });
  }
  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate(): boolean {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}


export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}