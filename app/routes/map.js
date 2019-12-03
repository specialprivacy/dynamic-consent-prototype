import { inject as service } from '@ember/service';
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
    return Ember.A([
      {
        title: "Point 1",
        description: "Description for point 1",
        lat: 50.88757677577886,
        lng: 4.700904403423928
      },
      {
        title: "Point 2",
        description: "Description for point 2",
        lat: 50.882290494097454,
        lng: 4.69873718413374
      },
      {
        title: "Point 3",
        description: "Description for point 3",
        lat: 50.88113298234043,
        lng: 4.71454822352992
      },
      {
        title: "Point 4",
        description: "Description for point 4",
        lat: 50.89469640170628,
        lng: 4.723604528418451
      },
    ]);
  }
});
