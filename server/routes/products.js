// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/products", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("products/add", { title: "Add New Product", products: "" });
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET the Product Details page in order to edit an existing Product
router.get("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  product.findById(id, {}, {}, function (err, productToEdit) {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render("products/details", {
      title: "Edit The Product",
      products: productToEdit,
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
