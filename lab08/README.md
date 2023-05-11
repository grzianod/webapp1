# Netflux Server

The `Netflux Server` is the server-side app companion of the `Netflux` front-end. It presents some APIs to perform CRUD operations on the Films of the `Netflux` web application.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Films__

- URL: `/api/films`

- Method: `GET`

- Description: Get all the Films.

- Request body: _None_

- Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

- Response body: An array of objects, each describing a Film as shown below:
    ```
    [
      {
          "id": 1,
          "title": "Pulp Fiction",
          "favorite": 1,
          "date": "2023-03-09T23:00:00.000Z",
          "rating": 5
      },
      ...
    ]   
  ```
  
### __Get Film by Id__

- URL: `/api/films/<id>`

- Method: `GET`

- Description: Get the Film identified by the ID `<id>`.

- Request body: _None_

- Response: `200 OK` (success), `404 Not Found` (wrong ID), or `500 Internal Server Error` (generic error).

- Response body: An object, describing a single Film as show below:
    ```
    {
      "id": 1,
      "title": "Pulp Fiction",
      "favorite": 0,
      "date": "2022-03-10T23:00:00.000Z",
      "rating": 2
    }
    ```


### __Get all Filtered Films__

- URL: `/api/films/filter/<filter>`

- Method: GET

- Description: Get all the Films filtered by a given `<filter>`.

- Request body: _None_

- Response: `200 OK` (success), `404 Not Found` (wrong ID), or `500 Internal Server Error` (generic error).

- Response body: An array of objects, each describing an answer as shown below:
    ```
    [
      {
        "id": 1,
        "title": "Pulp Fiction",
        "favorite": 1,
        "date": "2023-03-09T23:00:00.000Z",
        "rating": 5
      }, 
      ...
    ]
    ```

### __Add a new Film__

- URL: `/api/films/add`

- Method: `POST`

- Description: Insert a new Film providing all its information.

- Request body: An object representing a Film (Content-Type: `application/json`).
    ```
    Content-Type: application/json

    {
       "title": "Inception",
       "favorite": true,
       "watchdate": "2023-05-01",
       "rating": 5,
       "user": 3
    }
    ```

- Response: `201 OK` (Created),`422 Unprocessable Content` (invalid field content) `503 Internal Server Error` (generic error) or `505 Version not supported` (unsupported version)

- Response body: An objects describing the added Film (together with its database ID) as shown below:
    ```
    {
        "id": 6,
        "title": "Inception",
        "favorite": true,
        "watchdate": "2023-05-01",
        "rating": 5,
        "user": 3
    }
    ```

### __Update a Film__

- URL: `/api/films/update/<id>`

- Method: `PUT`

- Description: Updating all the information about a Film by its ID

- Request body: An object representing a Film (Content-Type: `application/json`).
    ```
    Content-Type: application/json

    {
       "title": "Pulp Fiction",
       "favorite": true,
       "watchdate": "2023-05-01",
       "rating": 4,
       "user": 3
    }
    ```

- Response: `201 OK` (Created),`422 Unprocessable Content` (invalid field content) `503 Internal Server Error` (generic error) or `505 Version not supported` (unsupported version)

- Response body: An objects describing the added Film (together with its database ID) as shown below:
    ```
    {
        "id": 1,
        "title": "Pulp Fiction",
        "favorite": true,
        "watchdate": "2023-05-01",
        "rating": 4,
        "user": 3
    }
    ```

### __Update a Film Rating__

- URL: `/api/films/update/<id>/rating`

- Method: `PUT`

- Description: Updating a specific Film rating given its ID

- Request body: An object representing a Film (Content-Type: `application/json`).
    ```
    Content-Type: application/json

    {
       "rating": 5
    }
    ```

- Response: `201 OK` (Created),`422 Unprocessable Content` (invalid field content) `503 Internal Server Error` (generic error) or `505 Version not supported` (unsupported version)

- Response body: An objects describing the added Film (together with its database ID) as shown below:
    ```
    {
        "id": 1,
        "title": "Pulp Fiction",
        "favorite": true,
        "watchdate": "2023-05-01",
        "rating": 5,
        "user": 3
    }
    ```

### __Update a Film Favorite' choice__

- URL: `/api/films/update/<id>/favorite`

- Method: `PUT`

- Description: Updating a specific Film favorite choice given its ID

- Request body: An object representing a Film (Content-Type: `application/json`).
    ```
    Content-Type: application/json

    {
       "favorite": false
    }
    ```

- Response: `201 OK` (Created),`422 Unprocessable Content` (invalid field content) `503 Internal Server Error` (generic error) or `505 Version not supported` (unsupported version)

- Response body: An objects describing the added Film (together with its database ID) as shown below:
    ```
    {
        "id": 1,
        "title": "Pulp Fiction",
        "favorite": false,
        "watchdate": "2023-05-01",
        "rating": 5,
        "user": 3
    }
    ```

### __Delete a Film__

- URL: `/api/films/<id>`

- Method: `DELETE`

- Description: Delete a specific Film given its ID

- Request body:  _None_

- Response: `200 OK` (Created) or `500 Internal Server Error` (generic error).

- Response body: _None_

