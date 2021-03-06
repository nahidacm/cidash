import { IncomingForm } from "formidable";
import mv from "mv";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      var oldPath = files.file.filepath;
      var fs = require("fs");
      var dir = "./public/uploads";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      var newPath = `./public/uploads/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
}
