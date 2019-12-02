import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  paperToaster: service(),
  currentDataSubject: service(),
  username: alias("model.username"),
  password: alias("model.password"),

  actions: {
    login() {
      this.model.save().then(session => {
        return session.get("dataSubject");
      }).then(dataSubject => {
        this.currentDataSubject.currentDataSubject = dataSubject;
        this.replaceRoute("map");
      }).catch((ex) => {
        ex.errors.forEach(error => {
          this.paperToaster.show(error, { toastClass: "error-toast"});
        })
      });
      return false;
    }
  }
});
