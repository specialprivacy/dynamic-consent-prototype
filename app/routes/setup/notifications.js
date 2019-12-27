import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

  model() {
    return this.store.findAll("notification-mode");
  },
  afterModel() {
    return this.store.findRecord("notification-mode", this.currentDataSubject.currentDataSubject.belongsTo("notificationMode").id())
  }
});
