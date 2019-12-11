import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({

  queryParams: {
    latitude: {
      refreshModel: true,
      replace: true
    },
    longitude: {
      refreshModel: true,
      replace: true
    }
  },

  model(params) {
    return hash({
      locations: this.store.query("location", params),
      categories: this.store.findAll("category")
    });
  }
});
