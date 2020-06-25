const express = require('express');
const connection = require('../conf');
const router = express.Router();

router.get('/', (req, res) => {

})

// repond à POST /drugs
// repond (?) à POST /drugs?username=Paulo
router.post('/', (req, res) => {

    const nameUser = req.query.username;
    //-----begin transaction --------

    connection.beginTransaction(() => {
        connection.query("SELECT id FROM user WHERE name=?", [nameUser], (errSelect, resSelect) => {
            if (errSelect) {
                connection.rollback();
                return res.status(500).send('Erreur lors de la selection du user' + errSelect);
            }
            const idUser = resSelect[0].id;

            connection.query(" INSERT INTO drug SET ?", [req.body], (errIns1, resultIns1) => {
                if (errIns1) {
                    connection.rollback();
                    return res.status(500).send('Erreur lors de l\'insertion' + err);
                }
                //
                // deplacer sur la prtie rappel
                connection.query("INSERT INTO rappel SET ?", [req.body], (errIns2, resultIns2) => {
                    if (errIns2) {
                        connection.rollback();
                        return res.status(500).send('Erreur lors de l\'insertion' + err);
                    }
                })
                connection.end();
                return res.status(200).send('Operation successful');
            })
        })
    })
})


router.put('/:id', (req, res) => {


    connection.query(" UPDATE drug SET id = ?",
        [req.params.id], (err, results) => {
            if (err) {

                res.status(500).send('Erreur lors de la sauvegarde des données' + err);
            } else {
                res.status(200).send(results);
            }
        })
})

module.exports = router;