import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  firstName: attr(),
  lastName: attr(),
  hasCompletedSetup: attr(),
  categories: hasMany("category"),
  locations: hasMany("data-subject-location")
});
