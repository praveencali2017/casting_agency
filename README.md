# Casting Agency App

Udacity Capstone Project [UDACITY FULL STACK WEB NANODEGREE](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044):

**Goal:**
_The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. You are an Executive Producer within the company and are creating a system to simplify and streamline your process._

**Models:**
1. Movie
2. Actor
3. MovieActorLink (Association table of 1 and 2)
---
## REST APIs
###1. **Create Movie**: `POST /v1/movies`
* **Request**
```
{
    "title": "Avengers",
    "release_date": "2021-01-20"
}
```
* **Response**

**STATUS: 200**
```

{
    "data": {
        "id": 1,
        "release_date": "Wed, 20 Jan 2021 00:00:00 GMT",
        "title": "Avengers"
    },
    "success": true
}
```

### 2. **Fetch Movies**: `GET /v1/movies`
* **Request:**
```
None
```

* **Response:**

 **STATUS: 200**
```

{
    "data": {
        "id": 1,
        "release_date": "Wed, 20 Jan 2021 00:00:00 GMT",
        "title": "Avengers"
    },
    "success": true
}
```

### 3. **Fetch Movie**: `GET /v1/movies/{id}`
* **Request:**
```
id = 1
```

* **Response:**

**STATUS: 200**
```

{
    "data": {
        "id": 1,
        "release_date": "Wed, 20 Jan 2021 00:00:00 GMT",
        "title": "Avengers"
    },
    "success": true
}
```

### 4. **Delete Movie**: `DELETE /v1/movies/{id}`
* **Request:**
```
id = 1
```

* **Response:**

**STATUS: 200**
```

{
    "success": true
}
```


### 5. **Create Actor**: `POST /v1/actors`
* **Request:**
```
{"name": "john", "age": 30, "gender":"male"}
```

* **Response:**

**STATUS: 200**
```
{
    "data": {
        "age": 30,
        "gender": "male",
        "id": 3,
        "name": "john"
    },
    "success": true
}
```

### 6. **Fetch Actors**: `GET /v1/actors`
* **Request:**
```
None
```

* **Response:**

**STATUS: 200**
```
{
    "data": [{
        "age": 30,
        "gender": "male",
        "id": 3,
        "name": "john"
    }],
    "success": true
}
```

### 6. **Fetch Actor**: `GET /v1/actors/{id}`
* **Request:**
```
id = 3
```

* **Response:**

**STATUS: 200**
```
{
    "data": {
        "age": 30,
        "gender": "male",
        "id": 3,
        "name": "john"
    },
    "success": true
}
```

### 6. **Delete Actor**: `DELETE /v1/actors/{id}`
* **Request:**
```
id = 3
```

* **Response:**

**STATUS: 200**
```
{
    "success": true
}
```
### Exceptions Template

---
**STATUS: 4xx or 5xx**
```

{
    "msg": "error message",
    "success": false
}
```

### 7. **Update Actor**: `PATCH /v1/actors/{id}`
* **Request:**
```
id=1

{
    Actor attributes, [case sensitive]
}
```

* **Response:**

**STATUS: 200**
```
{
    "data": {
       "age": 30,
       "gender": "male",
       "id": 2,
       "name": "Praveen"
    },
    "success": true
}
```

### 8. **Update Movie**: `PATCH /v1/movies/{id}`
* **Request:**
```
id=1

{
    Actor attributes, [case sensitive]
}
```

* **Response:**

**STATUS: 200**
```
{
    "data": {
        "id": 2,
        "release_date": "Wed, 20 Jan 2021 00:00:00 GMT",
        "title": "Avengers Endgame"
    },
    "success": true
}
```

### 9. **Add an actor to movie** `POST /v1/movies_cast`
* **Request:**
```

{
    "movie_id": 1,
    "actor_id":2,
}
```

* **Response:**

**STATUS: 200**
```
{
    "success": true
}
```


### 10. **Fetch Movie's Actors**: `GET /v1/movies_cast`
* **Request:**
```
id = 2
```

* **Response:**

**STATUS: 200**
```
{
    "data": [
        {
            movie:{
                "id": 2,
                "release_date": "Wed, 20 Jan 2021 00:00:00 GMT",
                "title": "Avengers Endgame"
            },
            actors:[
            {
               "age": 30,
               "gender": "male",
               "id": 2,
               "name": "Praveen"
            },
            {
               "age": 29,
               "gender": "male",
               "id": 4,
               "name": "Praveen KN"
            }
            ]
        }
    ],
    "success": true
}
```

### 12. **Remove Actor From The Movie**: `DELETE /v1/movies_cast`
* **Request:**
```
?actor_id=1&movie_id=2
```
## How to test:
1. Make sure to change `DATABASE_URI` to a different one suitable for testing, so that it won't
affect the real database while performing any CRUD operations.
2. Run `test_casting_app.py` to evaluate the test cases.

* **Response:**

**STATUS: 200**
```
{
    "success": true
}
```

### Exceptions Template

---
**STATUS: 4xx or 5xx**
```

{
    "msg": "error message",
    "success": false
}
```
