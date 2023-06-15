# Email API - Cloudflare Worker

This email api is a Cloudflare Worker that allows you to send emails from your app using Cloudflare Workers and its partener provider MailChannel.net (Free email transations via Cloudflare workers).

## Setup
- Get Cloudflare Worker Address
- Set up in Cloudflare Workers a "EMAIL_TOKEN" env secret choose a random string.
- Call API with EMAIL_TOKEN in the Authorization header, and the email data in the body. (Example below).

## Usage Example

```
curl  -X POST \
  '<< Cloudflare Worker Address>>' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <<TOKEN HERE>>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "to": [
    {
      "name": "To User Name",
      "email": "to@user.com"
    }
  ],
  "from": {
    "name": "From User Name",
    "email": "from@user.com"
  },
  "subject": "Email Subject",
  "html": "<h1>HTML</h1>" // <-- This will be ignored if text is present
  "text": "Message Body" 
}'
```