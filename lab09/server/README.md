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

- Response body: An array of objects, each describing a Film or an error object as shown below:
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
  ```
      {
          "error": "Database not found"
      } 
  ```

### __Get all Filtered Films__

- URL: `/api/films/filter/<filter>`

- Method: GET

- Description: Get all the Films filtered by a given `<filter>`.

- Request body: _None_

- Response: `200 OK` (success), `404 Not Found` (wrong filter), or `500 Internal Server Error` (generic error).

- Response body: An array of objects, each describing an answer or an error object as shown below:
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
  ```
      {
          "error": "Filter Not Valid"
      } 
  ```

