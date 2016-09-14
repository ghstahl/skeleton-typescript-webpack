/**
 * Created by Herb on 9/13/2016.
 */
/**
 * Created by Dev on 9/10/2016.
 */
import {DialogController} from 'aurelia-dialog';

export class InfoPrompt {
    static inject = [DialogController];
    controller:DialogController;

    header:string;
    message:string;
    constructor(controller) {
        this.controller = controller;
        controller.settings.lock = false;

    }
    activate(model) {
        this.header = model.header;
        this.message = model.message;
    }
}
