import { alias } from '@ember/object/computed';
import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  timestamp: attr(),
  coordinates: attr(),
  dataSubject: belongsTo("data-subject"),
  inferredCategories: hasMany("category", { async: false }),
  suggestedCategories: hasMany("category", { async: false }),

  latitude: alias("coordinates.latitude"),
  longitude: alias("coordinates.longitude")
});
