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
      notifyMe();
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

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
