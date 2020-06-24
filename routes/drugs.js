const express = require('express');
const router = express.Router();


router.post('/Thomas/drugs', (req, res) => {


    connection.query(


        " INSERT INTO drug SET ?", [req.body],

        (err, results) => {

            if (err) {
                res.status(500).send('Erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }

        })

})


router.put('/Thomas/drugs/:id', (req, res) => {
    const version = req.params.id

    connection.query(" UPDATE drug SET id = ?",
        version, (err, results) => {
            if (err) {

                res.status(500).send('Erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }
        })
})