# `fetch`

In this part of the assessment, you will create a function to make a request
using `fetch`.

Run `npm test` to see all the specs you need to pass. (Do **NOT** modify the
files in the __test__ directory.)

Each of the 6 test specs in this part is worth **4 points** for a total of **24
points.**

## Objective

Your objective is to implement the code in __fetch-post.js__ so that all specs
pass. In short, you will use `fetch` to make a `POST` request with a JSON body
and return a specific value from the response JSON body.
  
## Instructions

Create a function called `addPerson` in the __fetch-post.js__ file.

Inside the function, make a `POST` request to `http://example.com/api/people`
with the following JSON body:

```json
{
  "firstName": "Maul",
  "lastName": "Kimmerman"
}
```

If you format your request properly, you can expect the body of the response to
be:

```json
{
  "people": [
    { "id": 1, "lastName": "Zimmerman", "firstName": "Paul" },
    { "id": 2, "lastName": "Yimmerman", "firstName": "Raul" },
    { "id": 3, "lastName": "Limmerman", "firstName": "Caul" },
    { "id": 9, "lastName": "Kimmerman", "firstName": "Maul" },
  ]
}
```

Return the value of the `people` key from the `addPerson` function.
