import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ["latitude", "longitude", "radius", "zoom"],
  zoom: 14,
  mapLatitude: Ember.computed(function() {
    return this.latitude;
  }),
  mapLongitude: Ember.computed(function() {
    return this.longitude;
  }),
  latitude: 0,
  longitude: 0,
  radius: 500,
  showCategories: false,

  locations: computed("model.locations", "categories.@each.selected", function(){
    return this.model.locations.filter((location) => {
      return location.categories.any((category) => { return category.selected });
    });
  }),
  categories: alias("model.categories"),

  actions: {
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      this.set("latitude", location.lat);
      this.set("longitude", location.lng);
    },
  }
});

