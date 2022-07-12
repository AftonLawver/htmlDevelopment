// path is a core module, so we do not have to npm install path

const path = require('path');

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));


// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));
// we can extract pieces of this object as well.

// Concatenate paths

console.log(path.join(__dirname, 'test', 'hello.html'));
