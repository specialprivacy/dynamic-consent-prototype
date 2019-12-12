import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentDataSubject: service(),

  notificationModes: alias("model"),
  notificationMode: alias("currentDataSubject.currentDataSubject.notificationMode"),

  actions: {
    goBack() {
      return history.back();
    },
    proceed() {
      return this.transitionToRoute("setup.completed");
    },
    setNotificationMode(notificationMode) {
      this.currentDataSubject.currentDataSubject.set("notificationMode", notificationMode);
    }
  }
});
