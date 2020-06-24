const { Router } = require("express");
const express = require('express');
const router = express.Router();



router.post('/Thomas/rappel', (req, res) => {


    connection.query(


        " INSERT INTO rappel SET ?", [req.body],

        (err, results) => {

            if (err) {
                res.status(500).send('erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }

        })

})