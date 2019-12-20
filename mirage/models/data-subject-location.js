import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  dataSubject: belongsTo("data-subject"),
  inferredCategories: hasMany("category"),
  suggestedCategories: hasMany("category")
});
