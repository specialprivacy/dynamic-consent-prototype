import { Response } from "ember-cli-mirage";

export default function() {
  this.passthrough("http://linkedgeodata.org/sparql");
  this.resource("category");
  this.resource("location");
  this.resource("data-subject");
  this.resource("data-subject-location");
  this.post("/data-subject-locations", function(schema, request) {
    let attrs = this.normalizedRequestAttrs();
    const dataSubject = schema.dataSubjects.find(attrs.dataSubjectId);

    const params = new URLSearchParams();
    params.append("query", `
PREFIX lgdo: <http://linkedgeodata.org/ontology/>
PREFIX geom: <http://geovocab.org/geometry#>
PREFIX ogc:<http://www.opengis.net/ont/geosparql#>
SELECT (GROUP_CONCAT(?category;separator=",") as ?categories)
FROM <http://linkedgeodata.org> {
  ?uri a ?category.

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

  ?uri geom:geometry [ogc:asWKT ?g] .

  FILTER(bif:st_intersects (?g, bif:st_point (${attrs.coordinates.longitude}, ${attrs.coordinates.latitude}), 0.00001)) .
}
      `);

    return fetch("http://linkedgeodata.org/sparql", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "application/json"
      },
      body: params
    }).then(result => {
      return result.json();
    }).then(result => {
      result.results.bindings.forEach(result => {
        const categoriesUris = result.categories.value.split(",");
        let categories = schema.categories.where((category) => {
          return category.uris.some(uri => {return categoriesUris.includes(uri)});
        });
        categories = categories.models.filter(category => {return !dataSubject.categories.models.any(cat => cat.id === category.id)});
        categories.forEach(category => {
          if(!("suggestedCategoryIds" in attrs)) {
            attrs.suggestedCategoryIds = [];
          }
          attrs.suggestedCategoryIds.push(category.id);
        });
      });

      return schema.dataSubjectLocations.create(attrs);
    });
  });
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
