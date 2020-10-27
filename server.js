const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 6003;
const app = express();
const keys = require("./config/keys")
const mongoose = require("mongoose")

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json())

app.use("/auth", require("./routes/auth"))


mongoose.connect(keys.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})
.catch(() => {
  console.error("Cannot connect to db")
})


