import { Response } from "ember-cli-mirage";

export default function() {
  this.passthrough("http://linkedgeodata.org/sparql");
  this.resource("category");
  this.resource("location");
  this.resource("data-subject");
  this.resource("data-subject-location");
  this.resource("notification-mode");
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
    const neLat = request.queryParams.neLat || 0;
    const neLng = request.queryParams.neLng || 0;
    const swLat = request.queryParams.swLat || 0;
    const swLng = request.queryParams.swLng || 0;
    const dataSubject = schema.dataSubjects.find(request.queryParams.dataSubjectId);

    const params = new URLSearchParams();

    params.append("query", `
        SELECT ?uri ?lat ?lng ?name (GROUP_CONCAT(?category;separator=",") as ?categories)
WHERE
{
?uri a ?category .
FILTER(?category IN (

<http://linkedgeodata.org/ontology/ArtGallery>,
<http://linkedgeodata.org/ontology/Brewery>,
<http://linkedgeodata.org/ontology/Casino>,
<http://linkedgeodata.org/ontology/Cemetery>,
<http://linkedgeodata.org/ontology/Chapel>,
<http://linkedgeodata.org/ontology/Fountain>,
<http://linkedgeodata.org/ontology/Garden>,
<http://linkedgeodata.org/ontology/GolfCourse>,
<http://linkedgeodata.org/ontology/HistoricThing>,
<http://linkedgeodata.org/ontology/HotSpring>,
<http://linkedgeodata.org/ontology/Museum>,
<http://linkedgeodata.org/ontology/MusicVenue>,
<http://linkedgeodata.org/ontology/NaturalThing>,
<http://linkedgeodata.org/ontology/NatureReserve>,
<http://linkedgeodata.org/ontology/Nightclub>,
<http://linkedgeodata.org/ontology/Statue>,
<http://linkedgeodata.org/ontology/Theatre>,
<http://linkedgeodata.org/ontology/ThemePark>,
<http://linkedgeodata.org/ontology/Viewpoint>,
<http://linkedgeodata.org/ontology/WaterPark>,
<http://linkedgeodata.org/ontology/Zoo>,
<http://linkedgeodata.org/ontology/ArtsCentre>,
<http://linkedgeodata.org/ontology/Artwork>,
<http://linkedgeodata.org/ontology/PlaceOfWorship>,
<http://linkedgeodata.org/ontology/Monastery>,
<http://linkedgeodata.org/ontology/GraveYard>,
<http://linkedgeodata.org/ontology/Church>,
<http://linkedgeodata.org/ontology/Park>

))


?uri <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat .
?uri <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lng .

FILTER(?lat < ${neLat})
FILTER(?lat > ${swLat})
FILTER(?lng < ${neLng})
FILTER(?lng > ${swLng})

?uri <http://www.w3.org/2000/01/rdf-schema#label> ?name .
FILTER(LANG(?name) = "")
}
GROUP BY ?uri ?lat ?lng ?name
ORDER BY ?uri
      `);

    return fetch("http://linkedgeodata.org/sparql", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "application/json"
      },
      body: params
    }).then(result => {
      return result.json().then(result => {
        const locations = result.results.bindings.map(result => {
          if(schema.locations.find(result.uri.value)) {
            return schema.locations.find(result.uri.value);
          }

          const categoriesUris = result.categories.value.split(",");
          const categories = schema.categories.where((category) => {
            return category.uris.some(uri => {return categoriesUris.includes(uri)});
          });
          const preferred = dataSubject.categories.models.some(category => {return categories.includes(category)});
          return schema.locations.create({
            id: result.uri.value,
            name: result.name.value,
            description: result.name.value,
            coordinates: {latitude: result.lat.value, longitude: result.lng.value},
            categories,
            preferred
          });

        });
        return schema.locations.where(location => {
          return locations.any(loc => {return location.id === loc.id});
        });
      });
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
