import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  locations: alias("model"),

  bounds: computed("locations.@each.latitude", "locations.@each.longitude", function() {
    let neLat = null;
    let neLng = null;
    let swLat = null;
    let swLng = null;

    this.locations.forEach(location => {
      if(!neLat || location.latitude > neLat) {
        neLat = location.latitude;
      }
      if(!neLng || location.longitude > neLng) {
        neLng = location.longitude;
      }
      if(!swLat || location.latitude < swLat) {
        swLat = location.latitude;
      }
      if(!swLng || location.longitude < swLng) {
        swLng = location.longitude;
      }
    });

    return [[neLat || 59.445075099047166, neLng || 51.06445312500001], [swLat || 36.59788913307022, swLng || -27.597656250000004]];
  })
});
