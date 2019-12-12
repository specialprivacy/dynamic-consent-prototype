import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import { debounce, throttle, later } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  paperToaster: service(),

  zoom: 14,
  mapLatitude: 50.8503,
  mapLongitude: 4.3517,
  latitude: null,
  longitude: null,
  showCategories: false,
  hasLocationBeenSelected: false,
  showLocationPicker: not("hasLocationBeenSelected"),

  locations: computed("model.locations", "model.locations.length", "categories.@each.selected", function(){
    return this.model.locations.filter((location) => {
      return location.categories.any((category) => { return category.selected });
    });
  }),
  categories: alias("model.categories"),

  map: null,

  updateBounds() {
    if(!this.map || !this.hasLocationBeenSelected) return;
    const bounds = this.map.getBounds();
    this.set("neLat", bounds._northEast.lat);
    this.set("neLng", bounds._northEast.lng);
    this.set("swLat", bounds._southWest.lat);
    this.set("swLng", bounds._southWest.lng);
    return this.send("fetchLocations", this.neLat, this.neLng, this.swLat, this.swLng);
  },

  demoLocations: computed(function() {
    return [
      DS.PromiseObject.create({
        promise: new Promise(function(resolve) {
          return resolve(
            {
              title: "6, Rue Boucher - Paris",
              coordinates: {
                latitude: 48.8595096,
                longitude: 2.3440562
              }
            }
          )
        })
      }),
      DS.PromiseObject.create({
        promise: new Promise(function(resolve) {
          return resolve(
            {
              title: "Van Gogh Museum - Amsterdam",
              coordinates: {
                latitude: 52.3581089,
                longitude: 4.8811801
              }
            }
          )
        })
      })
    ]
  }),

  currentLocation: computed(function() {
    return DS.PromiseObject.create({
      promise: new Promise(function (resolve, reject) {
        return navigator.geolocation.getCurrentPosition(resolve, reject)
      }).then(position => {
          return {
            title: "Your current position",
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
        })
      })
  }),

  actions: {
    onLoad(event) {
      this.set("map", event.target);
    },

    onMove() {
      throttle(this, this.updateBounds, 1000);
    },
    onMoveEnd() {
      debounce(this, this.updateBounds, 500);
    },

    useLocation(location) {
      if (location && location.then) {
        location.then(location => {
          this.set("latitude", location.coordinates.latitude);
          this.set("longitude", location.coordinates.longitude);
          this.set("mapLatitude", location.coordinates.latitude);
          this.set("mapLongitude", location.coordinates.longitude);
          this.set("hasLocationBeenSelected", true);
          this.set("showDemo", false);
          this.send("addDataSubjectLocation", location);
        }).catch(error => {
          let errorMessage;
          switch(error.code) {
            case 1:
              errorMessage = "We could not read your device location.";
              break;
            case 2:
              errorMessage = "We could not fetch your device location.";
              break;
            case 3:
              errorMessage = "We could not fetch your device location in time.";
              break;
            default:
              errorMessage = "An error occured when fetching device position."
          }
          this.paperToaster.show(errorMessage, { toastClass: "error-toast"});
        });
      }
      else {
        this.set("hasLocationBeenSelected", true);
        this.set("showDemo", false);
      }
    }
  }
});
