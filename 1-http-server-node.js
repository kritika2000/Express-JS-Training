/************************************ Creating server with only NodeJS ******************************* */
const http = require("http");
const { readFileSync } = require("fs");

// Requesting or loading the file once, not with every request user makes.
const homePage = readFileSync("./navbar-app/index.html", "utf8");
/* console.log(homePage); // consoles the entire html doc. */
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeJS = readFileSync("./navbar-app/browser-app.js");
const homeLogo = readFileSync("./navbar-app/logo.svg");

const server = http.createServer((req, res) => {
  /* 
    res.end() should always be included to send the user a response 
    otherwise the browser just loads without getting any response.
    It signals the server that all the response header and body has been sent.
    MUST be called on each response.
    Can pass data as an argument(optional) which updates the document.body.
    Better to use res.write to send the response and not passing any data
    when calling res.end();
  */
  /**
   * We should add some meta data like what type of data the server is sending
   *  about the response to the client.
   */
  /* 
    Adding response headers. First arg is the status code, second is the response headers object.
    By setting the content-type to text/html(a media type) browser knows how to render this content.
    by setting it to text/plain, it will show the content as a string with
    h1 tags.
    With the status code, the browser knows what happend to the request.
    Whether it was successful, resource not found etc.
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  */
  /**
   * REQUEST OBJECT
   * req.method -> type of request(GET, POST etc.)
   * req.url -> the url(resource like /contact) that the user types in(not the domain)
   * We can conditionally send res based on the resource user has requested.
   */
  /**
   *
   * If we've an html file with resources like scripts, stylesheets etc are included,
   * and it is sent as response to the browser and when browser starts parsing it
   * and sees these resources, the browser will make the request to the server again
   * asking for the resources added into the file with the url mentioned as
   * href attribute or src attribute.
   * If the links are from external websites then it will make a call to their server.
   * But for the internal resources, we need to handle the requests for the request for resources
   * also like for /styles.css
                  /browser-app.js
                  /logo.svg
    by first reading these files and then conditionally send responses to browser depending on the req.url
   *
   */
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/html" });
    /* res.write("<h1>Home Page</h1>"); // Adds and h1 tag inside the body element. */
    res.write(homePage); //text/plain will send the entire html file data as it is as html strings.
    res.end();
  } else if (req.url == "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else if (req.url == "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  } else if (req.url == "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeJS);
    res.end();
  } else if (req.url == "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeLogo);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Not Found</h1>");
    res.end();
  }
});
// In production we have specific ports(well known ports) and for development we use any port numbers.
server.listen(4000);

// --save flag ensures the package/module is added in the package.json file.
