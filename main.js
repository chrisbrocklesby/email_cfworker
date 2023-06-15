export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      const token = request.headers.get('authorization').replace("Bearer ", "");

      if (!env.EMAIL_TOKEN || env.EMAIL_TOKEN.length === 0) {
        return new Response('You must set the Authorization Bearer Token.', {
          status: 401,
        });
      }

      if (token !== env.EMAIL_TOKEN) {
        return new Response('Unauthorized', { status: 401 });
      }
      const data = await request.text();
      const body = (!data || data.length === 0) ? {} : JSON.parse(data);

      const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify({
          "personalizations": [{
            "to": body.to || [],
          }],
          "from": {
            "email": body.from.email || " ",
            "name": body.from.name || " ",
          },
          "subject": body.subject || " ",
          "content": (body.text) ? [{
            "type": "text/plain",
            "value": body.text || " ",
          }] : [{
            "type": "text/html",
            "value": body.html || " ",
          }],
        }),
      })

      return new Response(
        JSON.stringify({
          status: response.status,
          message: response.statusText
        }), {
        status: response.status || 400,
      }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 404,
          message: "POST request only"
        }), {
        status: 404,
      }
      );
    }
  }
}
