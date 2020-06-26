const express = require("express");
const connection = require("../conf");
const router = express.Router();

// bonus: GET tous les users
router.get("/users", (req, res) => {
  connection.query(" SELECT * FROM user", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des données" + err);
    } else {
      res.status(200).json(results);
    }
  });
});

// bonus: GET tous les médicaments
router.get("/all", (req, res) => {
  connection.query(" SELECT * FROM drug", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des données" + err);
    } else {
      res.status(200).json(results);
    }
  });
});

// GET tous les médicaments d'un user
router.get("/", (req, res) => {
  const nameUser = req.query.username;
  connection.beginTransaction(() => {
    connection.query(
      "SELECT id FROM user WHERE username=?",
      [nameUser],
      (errSelect, resSelect) => {
        if (errSelect) {
          connection.rollback();
          return res
            .status(500)
            .send("Erreur lors de la selection du user" + errSelect);
        }
        const idUser = resSelect[0].id;

        connection.query(
          " SELECT id, medecine, administration_mode, date_start, date_end FROM drug WHERE user_id = ?",
          [idUser],
          (errIns1, resultIns1) => {
            if (errIns1) {
              connection.rollback();
              return res.status(500).send("Erreur lors de l'insertion" + err);
            } else {
              connection.commit();
              return res.status(200).json(resultIns1); // ici
            }
          }
        );

        //return res.status(200).json(res);
      }
    );
  });
});

// POST un nouveau médicament pour un user
router.post("/", (req, res) => {
  const nameUser = req.query.username;
  //-----begin transaction --------

  connection.beginTransaction(() => {
    connection.query(
      "SELECT id FROM user WHERE username=?",
      [nameUser],
      (errSelect, resSelect) => {
        if (errSelect) {
          connection.rollback();
          return res
            .status(500)
            .send("Erreur lors de la selection du user" + errSelect);
        }
        const idUser = resSelect[0].id;

        connection.query(
          " INSERT INTO drug SET ?",
          [req.body],
          (errIns, resultIns) => {
            if (errIns) {
              connection.rollback();
              return res
                .status(500)
                .send("Erreur lors de l'insertion" + errIns);
            } else {
              connection.commit();
              return res.status(200).send("Operation successful");
            }
          }
        );
      }
    );
  });
});

router.put("/:id", (req, res) => {
  connection.query(
    " UPDATE drug SET id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la sauvegarde des données" + err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

module.exports = router;
