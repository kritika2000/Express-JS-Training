const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { name, id, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  console.log(req.params); // { productId: '1' }
  const { productId } = req.params;
  const singleProduct = products.find(
    (product) => product.id == Number(productId)
  );
  if (singleProduct == undefined) {
    return res.status(404).send("Product Not Found");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  res.send(`<h2>${req.params.productId} ${req.params.reviewId}</h2>`);
});

// Handling query parms
app.get("/api/v1/query", (req, res) => {
  //req.query stores all the query parameters the user types. The user can type as many as he wants.
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  // Make sure you're not sending more than one responses for one request. Use return statement while sending response.
  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
