'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "Dynamic Consent",
    short_name: "Special",
    description: "This application is a prototype to show how consent could be asked of the user when it's really needed instead of asking it from the get go everytime.",
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
