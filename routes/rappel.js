const express = require("express");
const connection = require("../conf");
const router = express.Router();

// bonus: GET tous les rappels
router.get("/all", (req, res) => {
  connection.query(" SELECT * FROM rappel", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des données" + err);
    } else {
      res.status(200).json(results);
    }
  });
});

// GET tous les rappels pour un médicament
router.get("/nojoin/:id", (req, res) => {
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

// GET tous les éléments nécessaires à la construction d'une notification ou carte de rappel
router.get("/:id", (req, res) => {
  const idDrug = req.params.id;
  connection.query(
    " SELECT r.id, alert_name, medecine_quantity, pickup_time, medecine, administration_mode FROM rappel r JOIN drug d ON d.id = r.drug_id WHERE drug_id = ?",
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

// POST un nouveau rappel pour un médicament
router.post("/:id", (req, res) => {
  connection.query(
    "INSERT INTO rappel SET ?",
    [req.body],

    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la sauvegarde des données" + err);
      } else {
        res.status(200).send("Operation successful");
      }
    }
  );
});

module.exports = router;
