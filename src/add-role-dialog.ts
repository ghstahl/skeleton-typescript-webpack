/**
 * Created by Herb on 9/13/2016.
 */
/**
 * Created by Dev on 9/10/2016.
 */
import {DialogController} from 'aurelia-dialog';

export class AddRoleDialog {
    static inject = [DialogController];
    availableRoles:string[];
    currentUsersRoles:string[];
    filteredAvailableRoles:string[];
    areRolesAvailable:boolean = false;
    controller:DialogController;
    choice:string;
    question:string;

    constructor(controller) {
        this.controller = controller;

        controller.settings.lock = false;

    }
    recalcFilteredRoles(){
        this.filteredAvailableRoles =  this.availableRoles.filter((item) => {
            var arraycontainsturtles = (this.currentUsersRoles.indexOf(item) > -1);
            return !arraycontainsturtles;
        });
        this.areRolesAvailable = this.filteredAvailableRoles.length>0;
    }
    activate(model) {
        this.availableRoles = model.availableRoles;
        this.currentUsersRoles = model.currentUsersRoles;
        this.recalcFilteredRoles();
        if(this.areRolesAvailable){
            this.question = "Select a role to assign to this user.";
        }else{
            this.question = "Sorry, there are no roles available to assign!";
        }
    }
}
