const url = require('url');

const myURL = new URL('http://mywebsite.com/hello.html?id=100&status');

// Serialized URL
console.log(myURL.href);
console.log(myURL.toString());

// Host (root domain)
console.log(myURL.host);

// Pathname
console.log(myURL.pathname);

// Serialized query (everything after the question mark)
console.log(myURL.search);

// Params object
console.log(myURL.searchParams);