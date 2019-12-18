export default function(server) {

  const manual = server.create("notification-mode", { id: "manual", label: "Add manually", description: "The category will only be added to your profile if you press \"Yes\" when the notification appears. If you ignore the notification, the category will not be added."});
  const automatic = server.create("notification-mode", { id: "automatic", label: "Add automatically", description: "The category will be added to your profile unless you press \"No\" when the notification appears. If you ignore the notification, the category will be added."});
  const disabled = server.create("notification-mode", { id: "disabled", label: "No additional customization", description: "Your location will not be used to tailor your preferences."});

  const art = server.create("category", { id: "art", name: "Art", icons: { filled: "/assets/images/palette-filled.png", default: "/assets/images/palette-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Artwork", "http://linkedgeodata.org/ontology/ArtsCentre", "http://linkedgeodata.org/ontology/ArtGallery"] });
  const nature = server.create("category", { id: "nature", name: "Nature", icons: { filled: "/assets/images/tree-filled.png", default: "/assets/images/tree-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Park", "http://linkedgeodata.org/ontology/Viewpoint", "http://linkedgeodata.org/ontology/NatureReserve", "http://linkedgeodata.org/ontology/NaturalThing", "http://linkedgeodata.org/ontology/Garden", "http://linkedgeodata.org/ontology/HotSpring"] });
  const music = server.create("category", { id: "music", name: "Music", icons: { filled: "/assets/images/guitar-filled.png", default: "/assets/images/guitar-empty.png" }, uris: ["http://linkedgeodata.org/ontology/MusicVenue"] });
  const breweries = server.create("category", { id: "breweries", name: "Breweries", icons: { filled: "/assets/images/barrel-filled.png", default: "/assets/images/barrel-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Brewery"] });
  const casinos = server.create("category", { id: "casinos", name: "Casinos", icons: { filled: "/assets/images/dice-filled.png", default: "/assets/images/dice-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Casino"] });
  const religious = server.create("category", { id: "religious", name: "Religious", icons: { filled: "/assets/images/pray-filled.png", default: "/assets/images/pray-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Church", "http://linkedgeodata.org/ontology/Monastery", "http://linkedgeodata.org/ontology/PlaceOfWorship", "http://linkedgeodata.org/ontology/Chapel"] });
  const cemeteries = server.create("category", { id: "cemeteries", name: "Cemeteries", icons: { filled: "/assets/images/gravestone-filled.png", default: "/assets/images/gravestone-empty.png" }, uris: ["http://linkedgeodata.org/ontology/GraveYard", "http://linkedgeodata.org/ontology/Cemetery"] });
  const fountains = server.create("category", { id: "fountains", name: "Fountains", icons: { filled: "/assets/images/fountain-filled.png", default: "/assets/images/fountain-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Fountain"] });
  const golf = server.create("category", { id: "golf", name: "Golf", icons: { filled: "/assets/images/golf-filled.png", default: "/assets/images/golf-empty.png" }, uris: ["http://linkedgeodata.org/ontology/GolfCourse"] });
  const historic = server.create("category", { id: "historic", name: "Historic", icons: { filled: "/assets/images/coliseum-filled.png", default: "/assets/images/coliseum-empty.png" }, uris: ["http://linkedgeodata.org/ontology/HistoricThing"] });
  const museums = server.create("category", { id: "museum", name: "Museums", icons: { filled: "/assets/images/museum-filled.png", default: "/assets/images/museum-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Museum"] });
  const nightclubs = server.create("category", { id: "nightclubs", name: "Nightclubs", icons: { filled: "/assets/images/star-filled.png", default: "/assets/images/star-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Nightclub"] });
  const statues = server.create("category", { id: "statues", name: "Statues", icons: { filled: "/assets/images/statue-filled.png", default: "/assets/images/statue-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Statue"] });
  const theatres = server.create("category", { id: "theatres", name: "Theatres", icons: { filled: "/assets/images/tragedy-filled.png", default: "/assets/images/tragedy-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Theatre"] });
  const entertainment = server.create("category", { id: "entertainment", name: "Entertainment", icons: { filled: "/assets/images/rollercoaster-filled.png", default: "/assets/images/rollercoaster-empty.png" }, uris: ["http://linkedgeodata.org/ontology/Zoo", "http://linkedgeodata.org/ontology/WaterPark", "http://linkedgeodata.org/ontology/ThemePark"] });

  const bernard = server.create("data-subject", {firstName: "Bernard", lastName: "Roger", hasCompletedSetup: true, username: "bernard", password: "roger", notificationMode: automatic, categories: [art, nature]});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", hasCompletedSetup: false, username: "antoine", password: "roger", notificationMode: disabled, categories: []})

  server.create("data-subject-location", { timestamp: new Date(2019, 1, 30, 10), coordinates: { latitude: 48.2082, longitude: 16.3738 }, dataSubject: bernard });
  server.create("data-subject-location", { timestamp: new Date(2019, 4, 14, 12), coordinates: { latitude: 40.8518, longitude: 14.2681 }, dataSubject: bernard });
  server.create("data-subject-location", { timestamp: new Date(2019, 9, 9, 9), coordinates: { latitude: 43.7102, longitude: 7.2620 }, dataSubject: bernard });
  server.create("data-subject-location", { timestamp: new Date(2019, 9, 12, 18), coordinates: { latitude: 60.1699, longitude: 24.9384 }, dataSubject: bernard });
}
