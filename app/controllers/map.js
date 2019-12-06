import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  hasOriginalPositionBeenSet: false,
  zoom: 14,
  lat: null,
  lng: null,
  dataSubjectLat: null,
  dataSubjectLng: null,
  showCategories: false,

  locations: computed("model.locations", "categories.@each.selected", function(){
    return this.model.locations.filter((location) => {
      return location.categories.any((category) => { return category.selected });
    });
  }),
  categories: alias("model.categories"),

  actions: {
    setOriginalPosition(position) {
      console.log("setOriginalPosition: " + position);
      this.set("dataSubjectLat", position.coords.latitude);
      this.set("dataSubjectLng", position.coords.longitude);
      this.set("lat", position.coords.latitude);
      this.set("lng", position.coords.longitude);
      this.set("hasOriginalPositionBeenSet", true);
    },
    onPositionChanged(position) {
      console.log("onPositionChanged: " + position);
      this.set("dataSubjectLat", position.coords.latitude);
      this.set("dataSubjectLng", position.coords.longitude);
    },
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      console.log("updateLocation: " + location);
      this.set("dataSubjectLat", location.lat);
      this.set("dataSubjectLng", location.lng);
    },
  }
});

