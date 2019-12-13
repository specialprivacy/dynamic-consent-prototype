import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  router: service(),
  currentRouteName: alias("router.currentRouteName"),

  actions: {
    goBack() {
      return this.transitionToRoute("map");
    }
  }
});
