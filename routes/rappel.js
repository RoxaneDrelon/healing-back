const express = require('express');
const router = express.Router();

// Répond à ces routes
// GET /rappel
// GET /rappel?idUser=42
router.get('/', (req, res) => {
    let sqlRequest = "SELECT * FROM rappel";
    if (req.query.idUser) {
        sqlRequest += " WHERE id_user=?"
    }

    connection.query(sqlRequest, [req.query.idUser], (err, res) => {

    })
})


router.post('/', (req, res) => {
    connection.query(


        "INSERT INTO rappel SET ?", [req.body],

        (err, results) => {

            if (err) {
                res.status(500).send('erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }

        })

})

module.exports = router;