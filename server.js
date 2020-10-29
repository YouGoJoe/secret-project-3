const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const keys = require("./config/keys");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose
  .connect(keys.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
  })
  .catch(() => {
    console.error("Cannot connect to db");
  });
