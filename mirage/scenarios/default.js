export default function(server) {

  const manual = server.create("notification-mode", { id: "manual", label: "Add manually", description: "The category will only be added to your profile if you press \"Yes\" when the notification appears. If you ignore the notification, the category will not be added."});
  const automatic = server.create("notification-mode", { id: "automatic", label: "Add automatically", description: "The category will be added to your profile unless you press \"No\" when the notification appears. If you ignore the notification, the category will be added."});
  const disabled = server.create("notification-mode", { id: "disabled", label: "No additional customization", description: "Your location will not be used to tailor your preferences."});

  const art = server.create("category", {name: "Art"});
  const nature = server.create("category", {name: "Nature"});
  const music = server.create("category", {name: "Music"});
  const breweries = server.create("category", {name: "Breweries"});

  server.create("location", {
    name: "Museum of contemporary arts",
    description: "Some description",
    coordinates: { latitude: 50.88757677577886, longitude: 4.700904403423928 },
    categories: [art],
    preferred: true
  });
  server.create("location", {
    name: "Darkwood",
    description: "Some description",
    coordinates: { latitude: 50.89469640170628, longitude: 4.723604528418451 },
    categories: [nature],
    preferred: true
  });
  server.create("location", {
    name: "House of Jazz",
    description: "Some description",
    coordinates: { latitude: 50.88113298234043, longitude: 4.71454822352992 },
    categories: [music],
    preferred: false});
  server.create("location", {
    name: "Hall of Beer",
    description: "Some description",
    coordinates: { latitude: 50.882290494097454, longitude: 4.69873718413374},
    categories: [breweries],
    preferred: false
  });

  server.create("location", {
    name: "Brussels",
    description: "Location in Brussels",
    coordinates: { latitude: 50.844389, longitude: 4.355768},
    categories: [art, nature, music, breweries],
    preferred: false
  });

  server.create("location", {
    name: "Liège",
    description: "Location in Liège",
    coordinates: { latitude: 50.626121, longitude: 5.565884},
    categories: [art, nature, music, breweries],
    preferred: true
  });

  server.create("location", {
    name: "Paris",
    description: "Location in Paris",
    coordinates: { latitude: 48.810029, longitude: 2.317429},
    categories: [art, nature, music, breweries],
    preferred: false
  });

  server.create("data-subject", {firstName: "Bernard", lastName: "Roger", hasCompletedSetup: true, username: "bernard", password: "roger", notificationMode: automatic, categories: [art, nature]});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", hasCompletedSetup: false, username: "antoine", password: "roger", notificationMode: disabled, categories: []})
}
