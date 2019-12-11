import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  showDialog: true,
  zoom: 4,
  mapLatitude: 54.5260,
  mapLongitude: 15.2551,
  latitude: null,
  longitude: null,

  map: null,

  actions: {
    proceed() {
      const bounds = this.map.getBounds();
      return this.replaceRoute("map.view", { queryParams: {
          "latitude": this.latitude,
          "longitude": this.longitude,
          "neLat": bounds._northEast.lat,
          "neLng": bounds._northEast.lng,
          "swLat": bounds._southWest.lat,
          "swLng": bounds._southWest.lng,
        } } );
    },
    onLoad(event) {
      this.set("map", event.target);
    },
    useLocation(useDeviceLocation) {
      if(useDeviceLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.set("mapLatitude", position.coords.latitude);
          this.set("mapLongitude", position.coords.longitude);
          this.set("latitude", position.coords.latitude);
          this.set("longitude", position.coords.longitude);
          this.set("zoom", 14);
        });
      }
      this.set("showDialog", false);
    },
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      this.set("mapLatitude", location.lat);
      this.set("mapLongitude", location.lng);
      this.set("latitude", location.lat);
      this.set("longitude", location.lng);
    },
    onClick(mouseEvent) {
      if(!this.latitude && !this.longitude) {
        this.set("mapLatitude", mouseEvent.latlng.lat);
        this.set("mapLongitude", mouseEvent.latlng.lng);
        this.set("latitude", mouseEvent.latlng.lat);
        this.set("longitude", mouseEvent.latlng.lng);
      }
      return false;
    }
  }
});

