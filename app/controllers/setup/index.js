import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    proceed() {
      return this.replaceRoute("setup.locations");
    }
  }
});
