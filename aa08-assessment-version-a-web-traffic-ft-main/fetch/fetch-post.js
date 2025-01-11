if (!fetch) {
  var fetch = require('./test/node-fetch')(1);
}

/**
 * Do not change code above this line.
 * See README.md for instructions

 ******************************************************************************/

function addPerson(){
  const url = 'http://example.com/api/people';
  const data ={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'Maul',
    lastName: 'Kimmerman',
  })
};

return fetch(url, data)
  .then(response => response.json())
  .then(data => data.people)
  .catch(error => console.error('Error:', error));
}


/*******************************************************************************
 * Do not change code below this line.
 */

if (!exports) {
  var exports = {};
}
(function (exports) {
  try {
    exports.addPerson = addPerson;
  } catch (e) {
    exports.addPerson = () => { throw e };
  }
})(exports);
