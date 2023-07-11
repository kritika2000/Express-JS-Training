const express = require("express");
const path = require("path");
const app = express();

/**
 * To serve static files such as images, CSS files, and JavaScript files,
 * use the express.static built-in middleware function in Express.
 * https://expressjs.com/en/starter/static-files.html
 *
 * In Node, we'd to explicitly read the contents of all static files, and creating routes
 * to send the data to the client.
 *
 * app.use is used to setup static and middleware.
 * Static assets(image, scripts etc.) or files are those assets which server doesn't have to change.
 *
 * In SSR, we modify the assets before sending it to the client.
 */
app.use(express.static("./public"));

//Sending index.html data to the browser/client.
app.get("/", (req, res) => {
  /* 
        send the entire file to the client unlike reading file first then 
        send it via res.write(file content here...) using http module in node.
        If the index.html file is static we can put this file also inside public folder,
        then we do not need to use the app.get('/') route to send the file.
        We only send the html file when it is dynamic while doing SSR.
    */
  res.sendFile(path.join(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource Not Found</h1>");
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
