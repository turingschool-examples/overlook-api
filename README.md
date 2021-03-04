# overlook-api

This repo was created to be used with the Overlook project.

## Set Up

Clone this down, and `cd` into it.  Then run:

`npm install`

`npm start`

## Endpoints
| Description | URL | Method | Required Properties for Request | Sample Successful Response |
|----------|-----|--------|---------------------|-----------------|
| Get all users|`http://localhost:3001/api/v1/users`| GET  | none | object with `users` property containing an array of all users |
|Get single user|`http://localhost:3001/api/v1/users/<id>`     *where`<id>` will be a number of a traveler's id* | GET  | none | object of single user's info |
|Get all rooms| `http://localhost:3001/api/v1/rooms` | GET | none | object with `rooms` property containing an array of all rooms |
|Get all bookings| `http://localhost:3001/api/v1/bookings` | GET | none | object with `bookings` property containing an array of all bookings |
| Add new booking |`http://localhost:3001/api/v1/bookings`| POST | `{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }` | `{ message: 'Booking with id <id> successfully posted', newBooking: <Object with trip info just posted> }`|
| Delete single booking | `http://localhost:3001/api/v1/bookings/<id>`     *where`<id>` will be a number of a trip's id*  | DELETE | none | `{ message: Booking #<id> has been deleted }` |