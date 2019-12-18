export default function(server) {

  const manual = server.create("notification-mode", { id: "manual", label: "Add manually", description: "The category will only be added to your profile if you press \"Yes\" when the notification appears. If you ignore the notification, the category will not be added."});
  const automatic = server.create("notification-mode", { id: "automatic", label: "Add automatically", description: "The category will be added to your profile unless you press \"No\" when the notification appears. If you ignore the notification, the category will be added."});
  const disabled = server.create("notification-mode", { id: "disabled", label: "No additional customization", description: "Your location will not be used to tailor your preferences."});

  const art = server.create("category", { id: "art", name: "Art", uris: ["http://linkedgeodata.org/ontology/Artwork", "http://linkedgeodata.org/ontology/ArtsCentre", "http://linkedgeodata.org/ontology/ArtGallery"] });
  const nature = server.create("category", { id: "nature", name: "Nature", uris: ["http://linkedgeodata.org/ontology/Park", "http://linkedgeodata.org/ontology/Viewpoint", "http://linkedgeodata.org/ontology/NatureReserve", "http://linkedgeodata.org/ontology/NaturalThing", "http://linkedgeodata.org/ontology/Garden", "http://linkedgeodata.org/ontology/HotSpring"] });
  const music = server.create("category", { id: "music", name: "Music", uris: ["http://linkedgeodata.org/ontology/MusicVenue"] });
  const breweries = server.create("category", { id: "breweries", name: "Breweries", uris: ["http://linkedgeodata.org/ontology/Brewery"] });
  const casinos = server.create("category", { id: "casinos", name: "Casinos", uris: ["http://linkedgeodata.org/ontology/Casino"] });
  const religious = server.create("category", { id: "religious", name: "Religious", uris: ["http://linkedgeodata.org/ontology/Church", "http://linkedgeodata.org/ontology/Monastery", "http://linkedgeodata.org/ontology/PlaceOfWorship", "http://linkedgeodata.org/ontology/Chapel"] });
  const cemeteries = server.create("category", { id: "cemeteries", name: "Cemeteries", uris: ["http://linkedgeodata.org/ontology/GraveYard", "http://linkedgeodata.org/ontology/Cemetery"] });
  const fountains = server.create("category", { id: "fountains", name: "Fountains", uris: ["http://linkedgeodata.org/ontology/Fountain"] });
  const golf = server.create("category", { id: "golf", name: "Golf", uris: ["http://linkedgeodata.org/ontology/GolfCourse"] });
  const historic = server.create("category", { id: "historic", name: "Historic", uris: ["http://linkedgeodata.org/ontology/HistoricThing"] });
  const museums = server.create("category", { id: "museum", name: "Museums", uris: ["http://linkedgeodata.org/ontology/Museum"] });
  const nightclubs = server.create("category", { id: "nightclubs", name: "Nightclubs", uris: ["http://linkedgeodata.org/ontology/Nightclub"] });
  const statues = server.create("category", { id: "statues", name: "Statues", uris: ["http://linkedgeodata.org/ontology/Statue"] });
  const theatres = server.create("category", { id: "theatres", name: "Theatres", uris: ["http://linkedgeodata.org/ontology/Theatre"] });
  const entertainment = server.create("category", { id: "entertainment", name: "Entertainment", uris: ["http://linkedgeodata.org/ontology/Zoo", "http://linkedgeodata.org/ontology/WaterPark", "http://linkedgeodata.org/ontology/ThemePark"] });

  server.create("data-subject", {firstName: "Bernard", lastName: "Roger", hasCompletedSetup: true, username: "bernard", password: "roger", notificationMode: automatic, categories: [art, nature]});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", hasCompletedSetup: false, username: "antoine", password: "roger", notificationMode: disabled, categories: []})
}
