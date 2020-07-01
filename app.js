const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(config.get("MongoDB_URI"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/items", require("./routes/itemsApi"));
app.use("/api/users", require("./routes/usersApi"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
