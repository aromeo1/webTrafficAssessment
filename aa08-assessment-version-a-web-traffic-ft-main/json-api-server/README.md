# API For A Painting Museum

In this part of the assessment, you will document the request and response
components for the **API routes** of a painting museum server.

Each test spec in this project is worth **1 point** for a total of **63
points.**

## Objective

Your objective is to document the request and response components for each
endpoint of the server in the __answers.json__ file so that all tests pass when
you run `npm test`. **All the endpoints are RESTful endpoints for a JSON API
server.**

**READ THE ENTIRE INSTRUCTIONS BEFORE WRITING ANY DOCUMENTATION IN THE FILE.**
The instructions differ depending on the type of server, so please **read
carefully.**

## Setup

`cd` into the __json-api-server__ directory.

To **start the server,** run `npm start`. This will allow you to make requests
to [http://localhost:5000] using any client (browser or Postman).

To stop the server from listening to requests, press `<CTRL> + c` in the
terminal that you started the server (i.e., wherever you ran `npm start`).

To **reset the server data,** simply restart the server.

## Resources

Below is a list of all the **resources** for this painting museum server.

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
  "Content-Type": "application/json"
}
```

### Request/Response body formatting

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
3. Add an artist
   - `npm run test-03`
4. Edit a specified artist by artistId
   - `npm run test-04`
5. Get all the paintings of a specific artist based on artistId
   - `npm run test-05`
6. Get all the paintings of a specific year
   - `npm run test-06`
7. Get all the information of a specified painting by paintingId
   - `npm run test-07`
8. Add a painting to a specific artist based on artistId
   - `npm run test-08`
9. Delete a specified painting by paintingId
   - `npm run test-09`

To run all the test specs for all the endpoints, run `npm test`.

[http://localhost:5000]: http://localhost:5000
