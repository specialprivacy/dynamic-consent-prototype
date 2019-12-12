import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  categories: hasMany("category"),
  locations: hasMany("data-subject-location"),
  notificationMode: belongsTo("notification-mode")
});
