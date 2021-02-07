# Casting Agency App

Udacity Capstone Project [UDACITY FULL STACK WEB NANODEGREE](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044):

**Motivation:**
I am always keen on improving my skills on full stack development. Glad the course offered a comprehensive syllabus to fulfill the needs.
On the professional career development front, it is always great to be on edge with latest tools.<br>

To add further, the tech stacks utilized in the course 
made me more comfortable and created thoughts to build some interesting projects using what I have learned. Luckily, the capstone covers most of the important modules that were taught in the course curriculum.
This created a interest to prepare a fine dish from the available ingredients.<br>

**Introduction:**
Casting app, that enables a casting agency to create/manage movies, actors and assign/remove respective actors to the movies.
The important criteria is accessibility to resources/operations is limited based on the user roles. Executive producer has a leeway to control most of things in the app
, where as casting director and casting assistant have limited access based on their responsibilities.

**RBAC credentials and roles:**
Auth0 has been used to access APIs based on roles through JWT tokens.

* Casting Assistant
    * Can view actors and movies (`get:actors`, `get:movies`)
* Casting Director
    * All permissions a Casting Assistant has and…
    * Add or delete an actor from the database (`add:actors`, `delete:actors`)
    * Modify actors or movies (`update:actors`,`update:movies`)
    * Assign/Remove actors to movies (`manage:cast`)
* Executive Producer
    * All permissions a Casting Director has and… 
    * Add or delete a movie from the database (`add:movies`,`delete:movies`)

**ORM Models:**
1. Movie (movies)
2. Actor (actors)
3. MovieActorLink (Association table of 1 and 2) (movies_actors_link)

##[Setting up the app]()

---
#### Python Version: 3.9
#### Virtual Environment:
We recommend working within a virtual environment whenever using Python for
projects. This keeps your dependencies for each project separate and organaized.
Instructions for setting up a virual enviornment for your platform can be found
in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

```
python -m venv venv
venv/bin/activate or source activate (on Mac), after going inside venv/bin/
```

#### Pip Dependencies:
Once you have your venv setup and running, install dependencies by navigating
to the root directory and running:
` pip install -r requirements.txt `
This will install all of the required packages included in the requirements.txt
file.

#### Local Database Setup:
* Create database using `create database casting_app_db` (or any name of your choice. We can use psql to complete the database creation).
* `DATABASE_URI` is the env that has the value for our db connection. [Follow configuration syntax here](https://docs.sqlalchemy.org/en/14/core/engines.html)
* Run `python manage.py upgrade` to run the migration to the latest. This will create all the necessary tables.

#### Local Testing:
* Make sure to change database name in `DATABASE_URI` to different testing database name. Because
the tear down method will delete all the testing data and also we should not populate the local database used for project.
* Run `source setup.sh && python -v  test_casting_app.py` (source setup.sh will setup environment required for the application)

#### Starting The Server:
* Run ` source setup.sh && gunicorn casting_agency_app:app`. This spins up our server.

### [Heroku deployed app](https://prav-casting-agency-app.herokuapp.com/)


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
