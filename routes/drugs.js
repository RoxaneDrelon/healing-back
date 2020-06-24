const express = require('express');
const connection = require('../conf');
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


    connection.query(" UPDATE drug SET id = ?",
        [req.params.id], (err, results) => {
            if (err) {

                res.status(500).send('Erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }
        })
})