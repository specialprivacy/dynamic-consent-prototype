export default function(server) {
  server.create("data-subject", {firstName: "Bernard", lastName: "Roger", username: "bernard", password: "roger"});
  server.create("data-subject", {firstName: "Antoine", lastName: "Roger", username: "antoine", password: "roger"})
}
