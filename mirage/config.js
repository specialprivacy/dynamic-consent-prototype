import { Response } from "ember-cli-mirage";

export default function() {
  this.resource("category");
  this.resource("location");
  this.resource("data-subject");
  this.resource("session");
  this.post("/sessions", function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    const dataSubject = schema.dataSubjects.where({username: attrs.username, password: attrs.password}).models[0];
    if(!dataSubject) {
      return new Response(404, { }, { errors: ["No user with those credentials."] });
    }
    attrs["dataSubjectId"] = dataSubject.id;
    return schema.sessions.create(attrs);
  });
  this.get("/locations", function (schema, request) {
    const lat = request.queryParams.latitude || 0;
    const lng = request.queryParams.longitude || 0;

    return schema.locations.where((location) => {
      return getDistanceFromLatLonInKm(lat, lng, location.coordinates.latitude, location.coordinates.longitude) < 5;
    });
  });
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
