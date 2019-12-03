import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  watcherId: null,

  didInsertElement(...args) {
    this._super(...args);
    navigator.geolocation.getCurrentPosition(this.setOriginalPosition);
    this.set("watcherId", navigator.geolocation.watchPosition(this.geolocationSuccessCallback.bind(this), this.geolocationErrorCallback.bind(this)));
  },

  willDestroyElement(...args) {
    this._super(...args);
    navigator.geolocation.clearWatch(this.get("watcherId"));
  },

  geolocationSuccessCallback(position) {
    if(this.onPositionChanged) this.onPositionChanged(position);
  },

  geolocationErrorCallback(positionError) {
    console.log("Something went wrong when watching position: " + positionError.message);
  },
});
