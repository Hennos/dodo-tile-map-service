const express = require("express");
const fs = require("fs");
const path = require("path");
const jimp = require("jimp");
const multer = require("multer");

const upload = multer();

const router = express.Router();

router.get("/mapConfig", function (req, res) {
  res.status(200).sendFile(path.join(req.storagePath, "mapConfig.json"));
});

router.post("/mapConfig", upload.none(), function (req, res) {
  const { storagePath } = req;

  const validate = ({ width, height, scale }) =>
    Number.parseInt(width) &&
    Number.parseInt(height) &&
    Number.parseFloat(scale);

  if (validate(req.body)) {
    const storageExist =
      fs.existsSync(storagePath) && fs.lstatSync(storagePath).isDirectory();
    if (!storageExist) {
      fs.mkdirSync(storagePath);
    }

    fs.writeFile(
      path.join(storagePath, "mapConfig.json"),
      Buffer.from(
        JSON.stringify({
          width: Number.parseInt(req.body.width),
          height: Number.parseInt(req.body.height),
          scale: Number.parseFloat(req.body.scale),
        })
      ),
      (err) => {
        if (err) throw err;

        res.status(200).send("Параметры карты обновлены");
      }
    );
  } else {
    res.status(403).send("Заданы неверные параметры");
  }
});

router.get("/mapImage", function (req, res) {
  res.status(200).sendFile(path.join(req.storagePath, "map.jpg"));
});

router.post("/mapImage", upload.single("map"), async function (req, res, next) {
  const { storagePath } = req;

  const storageExist =
    fs.existsSync(storagePath) && fs.lstatSync(storagePath).isDirectory();
  if (!storageExist) {
    fs.mkdirSync(storagePath);
  }

  const image = await jimp.read(req.file.buffer);
  await image.write(path.join(storagePath, "map.jpg"));

  res.status(200).send("Изображение карты обновлено");
});

module.exports = router;
