import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

  model() {
    return this.currentDataSubject.currentDataSubject.get("locations");
  }
});
