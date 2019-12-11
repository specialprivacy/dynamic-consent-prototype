import { A } from '@ember/array';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({

  queryParams: {
    latitude: {
      refreshModel: false,
      replace: true
    },
    longitude: {
      refreshModel: false,
      replace: true
    },
    neLat: {
      refreshModel: false,
      replace: true
    },
    neLng: {
      refreshModel: false,
      replace: true
    },
    swLat: {
      refreshModel: false,
      replace: true
    },
    swLng: {
      refreshModel: false,
      replace: true
    }
  },

  model(params) {
    return hash({
      locations: A(),
      categories: this.store.findAll("category")
    });
  },

  actions: {
    fetchLocations(neLat, neLng, swLat, swLng) {
      return this.store.query("location", {neLat, neLng, swLat, swLng}).then(locations => {
        locations.forEach(location => {
          if(!this.controller.model.locations.includes(location)){
            this.controller.model.locations.pushObject(location);
          }
        });
      });
    }
  }
});
