const express = require("express");
const connection = require("../conf");
const router = express.Router();

// GET tous les rappels pour un médicament
router.get("/:id", (req, res) => {
  const idDrug = req.params.id;
  connection.query(
    " SELECT id, alert_name, medecine_quantity, pickup_time FROM rappel WHERE drug_id = ?",
    [idDrug],
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupération des données" + err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post("/", (req, res) => {
  const idDrug = req.params.id;
  connection.query(
    "INSERT INTO rappel SET ? WHERE drug_id = N",
    [req.body, idDrug],

    (err, results) => {
      if (err) {
        res.status(500).send("erreur lors de la sauvegarde des données" + err);
      } else {
        res.status(200);
      }
    }
  );
});

module.exports = router;
