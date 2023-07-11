/**
 * With APIs -> we send the json data to the client using res.json() method
 * and at client side we can use JS to display that data or consume that data
 * accordingly.
 * res.json() -> sends a converted JSON response and set the content-type as application/json.
 * With SSR -> We send the entire HTML with each request.
 */

const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  /* --sending json data(exported from data.js file).
    res.json(products);
  */
  // Goal here is when 'Products' is clicked it takes the use to /api/products and display products json.
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { name, id, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

/** Adding dynamic routes -> helpul when we have to create routes for 1000s items*/
app.get("/api/products/:productId", (req, res) => {
  // Accessing :productId using req.params
  console.log(req.params); // { productId: '1' }
  const { productId } = req.params;
  const singleProduct = products.find(
    (product) => product.id == Number(productId)
  );
  if (singleProduct == undefined) {
    // the product of the id eneterd doesn't exist.
    return res.status(404).send("Product Not Found");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  res.send(`<h2>${req.params.productId} ${req.params.reviewId}</h2>`);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
