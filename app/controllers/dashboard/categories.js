import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  categories: alias("model"),

  actions: {
    delete(model) {
      return model.destroyRecord();
    }
  }
});
