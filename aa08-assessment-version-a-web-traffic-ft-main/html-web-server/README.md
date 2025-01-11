# HTML Web Server For A Painting Museum

In this part of the assessment, you will document the request and response
components for an **HTML web server** for a painting museum.

Each test spec in this project is worth **1 point** for a total of **70
points.**

## Objective

Your objective is to document the request and response components for each
endpoint of the server in the __answers.json__ file so that all tests pass when
you run `npm test`. **All the endpoints are RESTful endpoints for a traditional
web server.**

**READ THE ENTIRE INSTRUCTIONS BEFORE WRITING ANY DOCUMENTATION IN THE FILE.**
The instructions differ depending on the type of server, so please **read
carefully.**

## Setup

`cd` into the __html-web-server__ directory.

To **start the server,** run `npm start`. This will allow you to make requests
to [http://localhost:5000] using any client (browser or Postman).

To stop the server from listening to requests, press `<CTRL> + c` in the
terminal where you started the server (i.e., wherever you ran `npm start`).

To **reset the server data,** simply restart the server.

## Resources

Below is a list of all the resources for this painting museum server.

- artists:
  - artistId: unique identifier for an artist
  - name: the name of the artist
- paintings:
  - paintingId: unique identifier for an painting
  - name: the name of the painting
  - year: of the year the painting was completed
  - artistId: of the artist that released the painting
- years:
  - year: unique identifier for a year, a year number (ex: 1999)

## Documentation

The documentation for this server should be written in the __answers.json__ file
provided to you. For each endpoint listed below, list out the request and
response components in the __answers.json__ file.

### Headers formatting

**Include ONLY necessary headers.**

To add a header as a component to the request or response, define the key and
value of a header in a JSON object set to the `headers` key on the `request`
or `response` object.

Here's an example:

```json
"headers": {
  "Content-Type": "application/x-www-form-urlencoded"
}
```

### Request body formatting

To add a `body` as a component to the request, define the data structure of the
`body` (object, array, nested object, or nested array). The values for objects
in the `body` must be truthy values.

Here's an example:

```json
"body": {
  "color": true,
  "toolbox": [
    {
      "tool": true
    }
  ]
}
```

### Response body formatting

If there is a response body for the endpoint, set the `body` key in the
`response` object to `true` or a truthy value.

Here's an example:

```json
"body": true
```

### Removing a component

To omit a component from the request or response, set the key of that request
or response component to `false`.

For example, to omit the `headers` of the request, change the `headers` key from
`null` to `false`.

```json
"headers": false,
```

To omit the `body` of the request, change the `body` key from `null` to `false`.

```json
"body": false
```

## Endpoints

Fill out the request and response components for the following endpoints in the
__answers.json__ file provided. The command to run the test specs for each
endpoint is also given.

1. Get all the artists
   - `npm run test-01`
2. Get a specific artist's details based on artistId
   - `npm run test-02`
3. Get the form to add an artist
   - `npm run test-03`
4. Form submission for adding an artist
   - `npm run test-04`
5. Get the form to edit an artist
   - `npm run test-05`
6. Form submission for editing an artist
   - `npm run test-06`
7. Get all the paintings of a specific year
   - `npm run test-07`
8. Get all the information of a specified painting by paintingId
   - `npm run test-08`
9. Form submission for adding a painting to a specific artist based on artistId
   - `npm run test-09`
10. Form submission for deleting a painting
    - `npm run test-10`

To run all the test specs for all the endpoints, run `npm test`.

[http://localhost:5000]: http://localhost:5000
