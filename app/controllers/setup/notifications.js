import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    goBack() {
      return history.back();
    },
    proceed() {
      return this.transitionToRoute("setup.completed");
    }
  }
});
