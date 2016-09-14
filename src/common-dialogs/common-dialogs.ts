import {lazy} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from './prompt';
import {InfoPrompt} from './info-prompt';

export class CommonDialogs {
    constructor(@lazy(DialogService)     private getDialogService: () => DialogService) {
        this.dialogService = this.getDialogService();
    }
    dialogService: DialogService;


    infoprompt(header,message) {
        return this.dialogService.open({viewModel: InfoPrompt, model: {header:header,message:message}});
    }
}