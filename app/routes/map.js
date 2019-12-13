import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  currentDataSubject: service(),

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
          return this.store.createRecord("data-subject-location", { timestamp: new Date(), coordinates: location.coordinates, dataSubject: this.currentDataSubject.currentDataSubject }).save();
        }
      })
    },
    fetchLocations(neLat, neLng, swLat, swLng) {
      return this.store.query("location", {neLat, neLng, swLat, swLng}).then(locations => {
        locations.forEach(location => {
          if(!this.controller.model.locations.includes(location)){
            this.controller.model.locations.pushObject(location);
          }
        });
      });
    }
  }
});
