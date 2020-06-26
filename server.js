const express = require("express");
const app = express();
const port = 7070;
const cors = require("cors");

app.use(cors());

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.send("Hello");
});

app.use("/drugs", require("./routes/drugs"));

app.use("/rappel", require("./routes/rappel"));

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
