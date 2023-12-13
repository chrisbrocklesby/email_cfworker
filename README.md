# Email API - Cloudflare Worker

This email api is a Cloudflare Worker that allows you to send emails from your app using Cloudflare Workers and its partener provider MailChannel.net (Free email transations via Cloudflare workers).

## Setup
- Get Cloudflare Worker Address <<CF_WORKER_URL_HERE>>
- Set up in Cloudflare Workers a "EMAIL_TOKEN" env secret choose a random string.
- Call API with EMAIL_TOKEN in the Authorization header, and the email data in the body. (Example below).

## Usage Example

Update your DNS TXT record to point to the MailChannel.net server. (This is a one time setup)
`v=mc1 cfid=<<WORKER_SUBDOMAIN>>.workers.dev cfid=<<DOMAIN_SEND_FROM>>`

Use PostMan, ThunderClient or CURL to send a POST request to the Cloudflare Worker URL with the following headers and body.

- Worker URL: <<CF_WORKER_URL_HERE>>
- Authorization: Bearer <<EMAIL_TOKEN>>
- Content-Type: application/json

- JSON Body:
```json
{
  "to": [{
      "name": "To User Name",
      "email": "to@chrisbrocklesby.com"
  }],
  "from": {
    "name": "From User Name",
    "email": "from@chrisbrocklesby.com"
  },
  "subject": "Email Subject",
  "html": "<h1>HTML</h1>", // <-- This will be ignored if text is present
  "text": "Message Body" 
}
```

- Curl:
```
curl  -X POST \
  <<CF_WORKER_URL_HERE>> \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <<EMAIL_TOKEN>>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "to": [{
      "name": "To User Name",
      "email": "to@chrisbrocklesby.com"
  }],
  "from": {
    "name": "From User Name",
    "email": "from@chrisbrocklesby.com"
  },
  "subject": "Email Subject",
  "text": "Message Body" 
}'
```
