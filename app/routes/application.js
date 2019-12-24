import { A } from '@ember/array';
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    return this.transitionTo("map");
  },
  model() {
    return A();
  }
});
