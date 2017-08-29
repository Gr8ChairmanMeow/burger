var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

//functions
var burgerThisName = function(ingredientsArr) {
    //console.log(ingredientsArr);
    var size = ingredientsArr[0] + " ";
    var protein = ingredientsArr[1] + " ";
    var toppingsArr = ingredientsArr[2];
    var extra = ingredientsArr[3];
    var burgerName = size + protein;
    var check = Array.isArray(toppingsArr);
    if (check) {
        for (var i = 0; i < toppingsArr.length; i++) {
            burgerName += toppingsArr[i] + " ";
        }
    } else {
        burgerName += toppingsArr + " ";
    }
    burgerName += extra + " Burger";

    return burgerName.trim();
};

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    burger.create([
        "name", "devoured"
    ], [
        burgerThisName([req.body.size, req.body.protein, req.body.topping, req.body.extra]), false
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    //console.log("id: " + req.params.id);
    console.log(condition)

    burger.delete(condition, function() {
        res.redirect("/");
    });


});


// Export routes for server.js to use.
module.exports = router;