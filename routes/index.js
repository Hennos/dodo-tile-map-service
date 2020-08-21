const express = require("express");
const jimp = require("jimp");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Tile Map Service");
});

router.post("/robot_map", async function (req, res, next) {
  const { map } = req.files;
  const image = await jimp.read(map.data);
  await image.write("./public/robot.jpg");
  res.send("Add new map to server");
});

module.exports = router;
