const express = require("express");
const app = express();

app.use(express.json());

const fetchBooks = (req, res, next) => {
  console.log("Fetching All Books..... It might take sometime.....");
  setTimeout(() => {
    console.log("--> All Books Fetched.");
  }, 1500);
  next();
};

app.get("/", (req, res) => {
  console.log("GET Request from " + req.url);
  res.status(200).json({ message: "Home page" });
});
app.get("/books", fetchBooks, (req, res) => {
  console.log("GET Request from " + req.url);
  res.status(200).json({ message: "Books page", status: "success" });
});
const singleBook = (req, res, next) => {
  console.log(req.params.name + " Book data is available");
  req.name = req.params.name;
  next();
};
app.get("/books/:name", singleBook, (req, res) => {
  console.log("GET Request from " + req.url);
  res.status(200).json({
    message: `${req.params.name} Book details Fetched.`,
    status: "success",
    book_name: req.name,
  });
});

const port = 8080;
app.listen(port, () => {
  console.log("Listening on Port: " + port);
});
