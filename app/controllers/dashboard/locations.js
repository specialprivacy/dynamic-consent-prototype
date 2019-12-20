import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  locations: alias("model"),

  actions: {
    delete(model) {
      return model.destroyRecord();
    }
  }
});
