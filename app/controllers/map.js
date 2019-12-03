import Controller from '@ember/controller';

export default Controller.extend({
  hasOriginalPositionBeenSet: false,
  zoom: 17,
  lat: null,
  lng: null,
  dataSubjectLat: null,
  dataSubjectLng: null,
  showCategories: true,

  recommendations: Ember.computed.alias("model"),

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
