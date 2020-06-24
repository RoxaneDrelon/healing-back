const express = require('express');
const connection = require('../conf');
const router = express.Router();


router.post('/Jean/createUser', (req, res) => {


    connection.query(


        " INSERT INTO user SET ?", [req.body],

        (err, results) => {

            if (err) {
                res.status(500).send('Erreur lors de la creation de l\'utilisateur' + err);
            } else {
                res.status(200).send(results);
            }

        })

})


router.put('/Isabelle/upDate/:id', (req, res) => {


    connection.query(" UPDATE user SET id = ?",
        [req.params.id], (err, results) => {
            if (err) {

                res.status(500).send('Erreur lors de l\'update utilisateur ' + err);
            } else {
                res.status(200).send(results);
            }
        })
})


app.delete('/Sebastien/delUser/:id', (req, res) => {


    connection.query("DELETE FROM user where id = ?", [req.params.id], (err, results) => {
        if (err) {

            res.status(500).send('Erreur lors de la suppression de l\'utilisateur' + err);
        } else {
            res.status(200).send(results);
        }
    })
})