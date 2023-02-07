
# Useful Strapi Auth APIs
In order to conduct the analysis the following built-in rest apis from Strapi were used.

### Update User OTP(Password) with Expiry

```
curl --location --request PUT 'http://localhost:1337/content-manager/collection-types/plugin::users-permissions.user/1' \
--header 'Authorization: Bearer <JWT>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "password": "<OTP>",
  "passwordExpiry": "2022-08-19T06:00:00.000Z"
}'
```
### User Login
```
curl --location --request POST 'http://localhost:1337/api/auth/local' \
--header 'Content-Type: application/json' \
--data-raw '{
  "identifier": "971554923941",
  "password": "<OTP>"
}
```
