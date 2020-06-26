const express = require('express');
const connection = require('../conf');
const router = express.Router();



// repond à POST /drugs
// repond (?) à POST /drugs?username=Paulo
router.post('/', (req, res) => {

    const nameUser = req.query.username;
    //-----begin transaction --------

    connection.beginTransaction(() => {
        connection.query("SELECT id FROM user WHERE username=?", [nameUser], (errSelect, resSelect) => {
            if (errSelect) {
                connection.rollback();
                return res.status(500).send('Erreur lors de la selection du user' + errSelect);
            }
            const idUser = resSelect[0].id;

            connection.query(" INSERT INTO drug SET ?", [req.body.drug],
                (errIns1, resultIns1) => {
                    if (errIns1) {
                        connection.rollback();
                        return res.status(500).send('Erreur lors de l\'insertion' + errIns1);
                    } else {
                        connection.commit();
                        return res.status(200).send('Operation successful');
                    }
                })
        })
    })
})


module.exports = router;