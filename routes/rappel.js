const express = require('express');
const connection = require('../conf');
const router = express.Router();

// Répond à ces routes
// GET /rappel
// GET /rappel?idUser=42


router.get('/:id', (req, res) => {


    connection.query("SELECT * FROM rappel Where drug_id= ?", [req.params.id],

        (err, results) => {


            if (err) {
                res.status(500).send('erreur lors de la sauvegarde des données' + err);
                return;
            }
            /*if (results.length === 0) {
                res.status(400).send('pas de données disponible ')
                return;
            }*/
            else {
                res.status(200).send(results);
            }
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