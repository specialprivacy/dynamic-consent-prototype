import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ["latitude", "longitude"],
  showDialog: true,
  zoom: 14,
  mapLatitude: 0,
  mapLongitude: 0,
  latitude: 0,
  longitude: 0,


  actions: {
    proceed() {
      return this.transitionToRoute("map.view", { queryParams: { "latitude": this.latitude, "longitude": this.longitude } } );
    },
    useLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.set("mapLatitude", position.coords.latitude);
        this.set("mapLongitude", position.coords.longitude);
        this.set("latitude", position.coords.latitude);
        this.set("longitude", position.coords.longitude);
        this.set("showDialog", false);
      });
    },
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      console.log("updateLocation: " + location);
      this.set("latitude", location.lat);
      this.set("longitude", location.lng);
    },
  }
});

