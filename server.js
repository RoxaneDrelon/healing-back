const express = require("express");
const connection = require("./conf");
const app = express();
const port = 7070;

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


app.use("/Thomas/drugs", require("./routes/drugs"));
app.use("/Thomas/drugs/:id", require("./routes/drugs"));

app.use("/Thomas/rappel", require("./routes/rappel"));

app.use("/Jean/createUser", require("./routes/user"))
app.use("/Isabelle/upDate/:id", require("./routes/user"))
app.use("/Sebastien/delUser/:id", require("./routes/user"))





app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
