import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  router: service(),
  currentDataSubject: service(),
  dataSubject: alias("currentDataSubject.currentDataSubject"),

  suggestions: alias("model"),
  showSuggestions: computed("router.currentRouteName", function() {
    return !["login", "logout"].includes(this.router.currentRouteName);
  }),

  actions: {
    onAcceptSuggestion(suggestion) {
      this.suggestions.removeObject(suggestion);
      const { location, category } = suggestion;
      location.suggestedCategories.removeObject(category);
      location.inferredCategories.pushObject(category);
      this.dataSubject.categories.pushObject(category);
      this.dataSubject.save();
      location.save();
    },
    onRejectSuggestion(suggestion) {
      const { location, category } = suggestion;
      location.suggestedCategories.removeObject(category);
      this.suggestions.removeObject(suggestion);
    },
    onToastClosed(suggestion) {
      const { location, category } = suggestion;
      location.suggestedCategories.removeObject(category);
      this.suggestions.removeObject(suggestion);
    },
  }
});
