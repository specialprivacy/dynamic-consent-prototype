import DS from 'ember-data';
const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  firstName: attr(),
  lastName: attr(),
  hasCompletedSetup: attr(),
  categories: hasMany("category"),
  locations: hasMany("data-subject-location"),
  notificationMode: belongsTo("notification-mode", { async: false })
});
