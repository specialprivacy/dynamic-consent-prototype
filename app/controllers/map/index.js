import { later } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

const ANIMATION_DURATION = 400;

export default Controller.extend({
  showDialog: true,
  zoom: 12,
  mapLatitude: 50.8503,
  mapLongitude: 4.3517,
  latitude: null,
  longitude: null,

  map: null,

  demoLocations: computed(function() {
    return [
      {
        title: "6, Rue Boucher - Paris",
        coordinates: {
          latitude: 48.8595096,
          longitude: 2.3440562
        }
      },
      {
        title: "Van Gogh Museum - Amsterdam",
        coordinates: {
          latitude: 52.3581089,
          longitude: 4.8811801
        }
      }
    ]
  }),
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

  actions: {
    onLoad(event) {
      this.set("map", event.target);
    },
    useLocation(useDeviceLocation) {
      if(useDeviceLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.set("latitude", position.coords.latitude);
          this.set("longitude", position.coords.longitude);
          this.set("mapLatitude", position.coords.latitude);
          this.set("mapLongitude", position.coords.longitude);
        });
      }
      this.set("showDemo", false);
      this.set("showDialog", false);
      later(() => {
        this.proceed();
      }, ANIMATION_DURATION);
    },
    usePredefinedLocation(location) {
      if (location) {
        this.set("latitude", location.coordinates.latitude);
        this.set("longitude", location.coordinates.longitude);
        this.set("mapLatitude", location.coordinates.latitude);
        this.set("mapLongitude", location.coordinates.longitude);
        this.set("showDialog", false);
        this.set("showDemo", false);
        later(() => {
          this.proceed();
        }, ANIMATION_DURATION);
      }
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

