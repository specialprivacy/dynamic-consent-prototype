export default function(server) {
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

  server.create("data-subject", {firstName: "Bernard", lastName: "Roger", hasCompletedSetup: true, username: "bernard", password: "roger", categories: [art, nature]});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", hasCompletedSetup: false, username: "antoine", password: "roger", categories: [music, breweries]})
}
