import { alias } from '@ember/object/computed';
import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr(),
  description: attr(),
  coordinates: attr(),
  categories: hasMany("category", {async: false}),
  preferred: attr(),

  latitude: alias("coordinates.latitude"),
  longitude: alias("coordinates.longitude")
});
