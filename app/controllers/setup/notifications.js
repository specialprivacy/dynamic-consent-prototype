import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentDataSubject: service(),

  notificationModes: alias("model"),
  notificationMode: alias("currentDataSubject.currentDataSubject.notificationMode"),

  dialogText: "",
  showDialog: false,

  actions: {
    goBack() {
      return history.back();
    },
    proceed() {
      return this.transitionToRoute("setup.completed");
    },
    showDialog(text) {
      this.set("dialogText", text);
      this.set("showDialog", true);
    }
  }
});
