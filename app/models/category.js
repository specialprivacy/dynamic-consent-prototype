import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  currentDataSubject: service(),
  dataSubject: alias("currentDataSubject.currentDataSubject"),
  name: attr(),
  icons: attr(),
  preferred: computed("dataSubject.{id,categories.@each}", function() {
    return this.dataSubject.categories.includes(this);
  }),
  icon: computed("preferred", function() {
    return this.preferred ? this.icons.filled : this.icons.default;
  }),

  selected: true
});
