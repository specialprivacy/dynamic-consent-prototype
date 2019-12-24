import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

  beforeModel() {
    this.currentDataSubject.set("currentDataSubject",  null);
    this.modelFor("application").clear();
    setTimeout(() => {
      this.replaceWith("login");
    }, 5000);
  }
});
