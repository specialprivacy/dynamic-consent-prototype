import { Response } from "ember-cli-mirage";

export default function() {
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
  })
}
