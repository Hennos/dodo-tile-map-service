const express = require("express");
const jimp = require("jimp");
const { route } = require("../app");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Tile Map Service");
});

router.post("/robot_map", async function (req, res, next) {
  const { map } = req.files;
  const image = await jimp.read(map.data);
  await image.write("./storage/robot.jpg");
  res.send("Add new map to server");
});

module.exports = router;
