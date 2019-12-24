import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),
  paperToaster: service(),

  beforeModel() {
    if(!this.currentDataSubject.currentDataSubject) {
      return this.replaceWith("login");
    }
    if(!this.currentDataSubject.currentDataSubject.hasCompletedSetup) {
      return this.replaceWith("setup");
    }
  },

  model() {
    return hash({
      locations: A(),
      categories: this.store.findAll("category")
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set("map", null);
    controller.set("hasLocationBeenSelected", false);
  },

  actions: {
    addDataSubjectLocation(location) {
      return this.store.findRecord("notification-mode", this.currentDataSubject.currentDataSubject.belongsTo("notificationMode").id()).then(notificationMode => {
        if(notificationMode.id !== "disabled") {
          return this.store.createRecord("data-subject-location", {
            timestamp: new Date(),
            coordinates: location.coordinates,
            dataSubject: this.currentDataSubject.currentDataSubject })
            .save()
            .then(location => {
              location.suggestedCategories.forEach(category => {
                this.modelFor("application").pushObject({location, category, notificationMode});
              });
            });
        }
      })
    },
    fetchLocations(neLat, neLng, swLat, swLng) {
      this.controller.set("isFetchingLocations", true);
      return this.store.query("location", { neLat, neLng, swLat, swLng, dataSubjectId: this.currentDataSubject.currentDataSubject.id }).then(locations => {
        locations.forEach(location => {
          if(!this.controller.model.locations.includes(location)){
            this.controller.model.locations.pushObject(location);
          }
        });
        this.controller.set("isFetchingLocations", false);
      });
    }
  }
});
