/**
 * Created by Dev on 9/8/2016.
 */
import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView()
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue){
    if (newValue) {
      (nprogress as any).start();
    } else {
      (nprogress as any).done();
    }
  }
}
