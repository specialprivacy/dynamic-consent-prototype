import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  locationsSortingKeys: ["timestamp:desc"],
  locations: sort("model", "locationsSortingKeys"),

  actions: {
    delete(model) {
      return model.destroyRecord();
    }
  }
});
