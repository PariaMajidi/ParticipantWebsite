const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const glob = require("glob");

const shuffle = require("./utils/shuffle");

const soundsDirname = path.join(__dirname, "../../sounds");

const repeat = 4;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const arrayOf = (filename) =>
  new Array(repeat)
    .fill(0)
    .map((r, index) => ({ filename, repetition: index + 1 }));

app.get("/api/sounds", (req, res) => {
  glob("**/*.wav", { cwd: soundsDirname }, (error, files) => {
    console.error("error", error);
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

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.use("/content/sounds", express.static(soundsDirname));

app.listen(port, () => console.log(`Listening on port ${port}`));
