import { alias } from '@ember/object/computed';
import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  timestamp: attr(),
  coordinates: attr(),
  dataSubject: belongsTo("data-subject"),

  latitude: alias("coordinates.latitude"),
  longitude: alias("coordinates.longitude")
});
