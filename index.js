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

app.post('/Thomas/drugs', (req, res) => {

  connection.query("INSERT INTO drug SET ? ", [req.body], (err, results) => {

    if (err) {
      res.status(500).send('erreur lors de la sauvegarde des données' + err);
    } else {
      res.status(200).send(results);
    }


  })

})

app.get("/", (request, response) => {
  response.send("Hello");
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
