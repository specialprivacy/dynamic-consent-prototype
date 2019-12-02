export default function(server) {
  server.create("data-subject", {firstName: "Bernard", lastName: "Roger", hasCompletedSetup: false, username: "bernard", password: "roger"});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", hasCompletedSetup: false, username: "antoine", password: "roger"})
}
