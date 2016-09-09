# SETUP:

1. Install Node
2. npm install
2. Install Docker
3. run ./setup.sh
4. cd db && run ./setup.sh
5. npm test
6. cd ../ && ./build.sh
7. ./run.sh
8. import postman collection
9. profit

# API:

POST /login
```
{
    "username": [string],
    "password": [string]
}
```

POST /signup
```
{
    "username": [string],
    "password": [string],
    "profile": {
        "name": [string],
        "gender": [string], // M or F
        "age": [int],
        "height": [float] // in feet,
        "religion": [string],
        "location": [string] // city
    }
}
```

PUT /profile
```
{
    "username": [string], // username of the user being updated

    // any of the following fields
    "name": [string],
    "gender": [string], // M or F
    "age": [int],
    "height": [float] // in feet,
    "religion": [string],
    "location": [string] // city
}
```

PUT /preferences
```
// don't differentiate between creating and updating a preference.
// therefore all preferences must be sent
// TODO: handle this differently
{   
    "username": [string], // username of the user being updated
    "gender": [string], // preferred gender M or F
    "minAge": [int],
    "maxAge": [int],
    "minHeight": [int],
    "maxHeight": [int],
    "religion": [string],
    "location": [string] // city
}
```

GET /matches
```
{
    "username": [string]
}
```

Stretch

POST /like/:id

POST /pass/:id