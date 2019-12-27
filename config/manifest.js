'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "dynamic-consent",
    short_name: "dynamic-consent",
    description: "",
    start_url: "/dynamic-consent/",
    scope: "/dynamic-consent/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        "src": "/dynamic-consent/assets/images/icon-192.png",
        "type": "image/png",
        "sizes": "192x192"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
};
