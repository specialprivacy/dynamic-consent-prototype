import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

  beforeModel() {
    if(!this.currentDataSubject.currentDataSubject) {
      return this.replaceWith("login");
    }
    if(this.currentDataSubject.currentDataSubject.hasCompletedSetup) {
      return this.replaceWith("map");
    }
  }
});
