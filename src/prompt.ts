/**
 * Created by Herb on 9/13/2016.
 */
/**
 * Created by Dev on 9/10/2016.
 */
import {DialogController} from 'aurelia-dialog';

export class Prompt {
    static inject = [DialogController];
    controller:DialogController;
    answer:string;
    question:string;
    constructor(controller) {
        this.controller = controller;
        this.answer = null;

        controller.settings.lock = false;
    }

    activate(question) {
        this.question = question;
    }
}
