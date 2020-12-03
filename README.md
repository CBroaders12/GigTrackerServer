# Gig Tracker Server

The server side of a simple web application that allows musicians to keep track of music and gigs. The code for the front-end can be found [here](https://github.com/CBroaders12/GigTrackerClient).

## Motivation

This repository is the back-end of my final project for the Web Development Course at [Eleven Fifty Academy](https://elevenfifty.org).

## Tech/framework used

<b>Built with</b>

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org)
- [Express](https://expressjs.com)

# API reference

The server side consists of 4 main controllers with the following endpoints

---

### `/user`

#### `user/login`

<b>POST</b>

Returns a token for the user to interface with their information

**Request**

```json
{
	"email": "example@email.com",
	"password": "password123"
}
```

**Response**

```json
{
	"token": "jsonwebtoken",
	"userType": "admin | user"
}
```

#### `user/register`

<b>POST</b>

Creates a new default user with the specified email and password.

**Request**

```json
{
	"email": "example@email.com",
	"password": "password123"
}
```

**Response**

```json
{
	"token": "jsonwebtoken"
}
```

---

### `/music`

#### `/music/` - **GET**

Retrieves all the music in a user's library

**Response**

```json
{
  "results": [
    {
      "title": "Number 9",
      "artist": "Moon Hooch",
      "style": null,
      "instrument": "Saxophone",
      "duration": "00:04:26"
    },
    {
      ...
    },
    .
    .
    .
  ]
}
```

#### `/music/new` - **POST**

Creates a new piece in the user's library

**Request**

```json
{
	"title": "Drunk",
	"artist": "Sungazer",
	"style": null,
	"instrument": null,
	"duration": "00:03:27"
}
```

\*_Only title required_

#### `/music/<musicId>`

**PUT**

**Request**

```json
{
	"title": "Drunk",
	"artist": "Sungazer",
	"style": "JAZZ",
	"instrument": "BASS",
	"duration": "00:03:27"
}
```

**DELETE**

Deletes a specified piece if it belongs to the user

---

### `/gig`

**_UNDER CONSTRUCTION_**

---

### `/admin`

#### `/admin/users` - **GET**

Retrieves a list of all users

**Response**

```json
{
  "users": [
    {
      "email": "example@email.com",
      "password": "hashedpassword",
      "userType": "admin | user"
    },

    {
      ...
    },
    .
    .
    .
  ]
}
```

#### `/admin/users/<userId>` - **DELETE**

Deletes the user with the specified ID

#### `/admin/updatepassword/<userId>` - **PUT**

Updates the password for the user with the specified ID

**Request**

```json
{
	"password": "newpassword456"
}
```

#### `/admin/add/<userId>` - **PUT**

Gives a specified user Admin status
