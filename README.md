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
		{},
		{}
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

#### `/gig` - **GET**

Retrieve a list of all gigs made by user

**Response**

```json
{
	"gigs": [
		{
			"name": "Johnson Wedding",
			"date": "2021-06-30"
		},
		{},
		{}
	]
}
```

#### `/gig/new` - **POST**

Creates a new gig in the user's account

**Request**

```json
{
	"name": "Christmas Livestream",
	"date": "2020-12-24"
}
```

#### `/gig/<gigId>` - **GET**

Retrieves all info for the specified gig including name, date, and songs with notes

**Response**

```json
{
	"name": "",
	"date": "",
	"music": [
		{
			"title": "O Holy Night",
			"artist": "Adolphe Adam",
			"style": "Holiday",
			"instrument": "Piano",
			"duration": "00:03:27",
			"set": {
				"notes": "Should be in the key of D for the singer"
			},
		}
		{},
		{}
	]
}
```

#### `/gig/<gigId>` - **PUT**

Updates the info, either name or date, of the specified gig

**Request**

```json
{
	"name": "Christmas Eve Livestream",
	"date": "2020-12-24"
}
```

#### `/gig/<gigId>` - **DELETE**

Deletes the specified gig

#### `/gig/<gigId>/add` - **POST**

Adds a new song from the user's library to the specified gigs including notes specific to gig

**Request**

```json
{
	"musicId": 27,
	"notes": "I will probably change this endpoint to be consistent with the others"
}
```

#### `/gig/<gigId>/<musicId>` - **PUT**

Updates the gig-specific notes for a song on the gig

**Request**

```json
{
	"notes": "We should transpose the bridge up a M3"
}
```

#### `/gig/<gigId>/<musicId>` - **DELETE**

Deletes a song from the specified gig

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
		{},
		{}
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

## License

© [Conor Broaders](https://github.com/CBroaders12)
