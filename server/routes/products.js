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
  res.render("products/add", { title: "Add New Product", products: "" });
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  let newProduct = new product({
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.price,
  });
  product.create(newProduct, function (err) {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect("/products");
  });
});

// GET the Product Details page in order to edit an existing Product
router.get("/edit/:id", (req, res, next) => {
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
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  let updatedProduct = new product({
    _id: id,
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.price,
  });
  product.updateOne({ _id: id }, updatedProduct, function (err) {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect("/products");
  });
});

//  GET the delete page in order to delete a Product
router.get("/delete", (req, res, next) => {
  res.render("products/delete", { title: "Delete A Product", products: "" });
});

// POST - process the delete
router.post("/delete", (req, res, next) => {
  //Take user input
  let productName = req.body.productName;
  let minPrice = req.body.minPrice;
  let maxPrice = req.body.maxPrice;
  console.log(
    "deleteMany Price Range=",
    minPrice,
    ", ",
    maxPrice,
    ", ",
    productName
  );

  //Take matched data
  var productFilter = {};
  //Check if entered price range
  if (minPrice != "" && maxPrice != "" && minPrice >= 0 && maxPrice >= 0) {
    productFilter = {
      Price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };
    //Check if entered product name
    if (productName != "") {
      productFilter = {
        Price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
        Productname: {
          $eq: productName,
        },
      };
    }
  } else {
    productFilter = {
      Productname: {
        $eq: productName,
      },
    };
  }
  console.log("filterString= ", productFilter);

  product.deleteMany(productFilter, (err, result) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //If delete was successful, return to products list
      console.log("deleteMany result.deletedCount=", result.deletedCount);
      res.redirect("/products");
    }
  });
});
module.exports = router;
