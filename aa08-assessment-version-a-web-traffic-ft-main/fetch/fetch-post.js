if (!fetch) {
  var fetch = require('./test/node-fetch')(1);
}

/**
 * Do not change code above this line.
 * See README.md for instructions

 ******************************************************************************/

// Your code here 


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
