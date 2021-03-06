import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  paperToaster: service(),
  currentDataSubject: service(),
  username: alias("model.username"),
  password: alias("model.password"),
  showLogo: true,

  actions: {
    login() {
      document.getElementById("username").blur();
      document.getElementById("password").blur();
      this.model.save().then(session => {
        return session.get("dataSubject");
      }).then(dataSubject => {
        this.currentDataSubject.set("currentDataSubject", dataSubject);
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
