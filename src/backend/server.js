const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const glob = require("glob");
const ExcelJS = require("exceljs");
const winston = require("winston");

const shuffle = require("./utils/shuffle");
const { nextParticipant, getParticipant } = require("./utils/participant");

const soundsDirname = path.join(__dirname, "../../sounds");

const dababaseFilename = path.join(__dirname, "../../database.xlsx");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const workbook = new ExcelJS.Workbook();
let worksheet = null;

if (fs.existsSync(path)) {
  workbook.xlsx.readFile(dababaseFilename);
  worksheet = workbook.getWorksheet("Results");
} else {
  worksheet = workbook.addWorksheet("Results");

  const opts = {
    alignment: { vertical: "bottom", horizontal: "right" },
    width: 32,
  };

  worksheet.columns = [
    { header: "VIBRATION", key: "vibration", ...opts },
    { header: "PARTICIPANT", key: "participant", ...opts },
    { header: "DIRECTION", key: "direction", ...opts },
    { header: "LIKERTSCALE", key: "likertScale", ...opts },
    { header: "SELECTION-TIME", key: "selectionTime", ...opts },
    { header: "END-AUDIO-TIME", key: "endAudioTime", ...opts },
    { header: "REPETITION", key: "repetition", ...opts },
  ];

  workbook.xlsx.writeFile(dababaseFilename);
}

const repeat = 4;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const arrayOf = (filename) => new Array(repeat).fill(0).map((r) => filename);

app.get("/api/sounds", (req, res) => {
  glob("**/*.wav", { cwd: soundsDirname }, (error, files) => {
    if (error) {
      res.status(500);
      return;
    }

    let pool = files
      .map((f) => path.basename(f, ".wav"))
      .reduce((acc, file) => [...acc, ...arrayOf(file)], []);
    pool = shuffle(pool);

    res.send(pool);
  });
});

app.post("/api/vibration", (req, res) => {
  const row = { ...req.body, participant: "foo" };
  worksheet.addRow(row).commit();
  workbook.xlsx.writeFile(dababaseFilename);
  logger.info("response", { row });

  res.send({});
});

app.use("/content/sounds", express.static(soundsDirname));

app.listen(port, () => console.log(`Listening on port ${port}`));
