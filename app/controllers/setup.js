import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentDataSubject: service(),
  actions: {
    finishSetup() {
      this.currentDataSubject.currentDataSubject.set("hasCompletedSetup", true);
      this.currentDataSubject.currentDataSubject.save().then(() => {
        return this.replaceRoute("map");
      })
    }
  }
});
