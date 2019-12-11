import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { debounce, throttle } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    "latitude",
    "longitude",
    "neLat",
    "neLng",
    "swLat",
    "swLng"
  ],
  bounds: computed("neLat", "neLng", "swLat", "swLng", function() {
    return [[this.neLat, this.neLng], [this.swLat, this.swLng]];
  }),
  zoom: 14,
  mapLatitude: computed(function() {
    return this.latitude;
  }),
  mapLongitude: computed(function() {
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

  map: null,

  updateBounds() {
    if(!this.map) return;
    const bounds = this.map.getBounds();
    this.set("neLat", bounds._northEast.lat);
    this.set("neLng", bounds._northEast.lng);
    this.set("swLat", bounds._southWest.lat);
    this.set("swLng", bounds._southWest.lng);
    return this.send("fetchLocations", this.neLat, this.neLng, this.swLat, this.swLng);
  },

  actions: {
    onLoad(event) {
      this.set("map", event.target);
      this.updateBounds();
    },

    onMove() {
      console.log("throttled")
      throttle(this, this.updateBounds, 1000);
    },
    onMoveEnd() {
      console.log("debounced")
      debounce(this, this.updateBounds, 500);
    },
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      this.set("latitude", location.lat);
      this.set("longitude", location.lng);
    }
  }
});

