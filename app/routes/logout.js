import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

  beforeModel() {
    this.currentDataSubject.set("currentDataSubject",  null);
    setTimeout(() => {
      this.replaceWith("login");
    }, 5000);
  }
});
