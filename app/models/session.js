import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  username: attr(),
  password: attr(),

  dataSubject: belongsTo("data-subject")
});
