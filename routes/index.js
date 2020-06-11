var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Tile Map Service");
});

module.exports = router;
