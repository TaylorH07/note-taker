const router = require('express').Router();
const db = require('../db/db.js')

router.get('/notes', (req,res) => {
    res.status(200).json(JSON.parse(db.getNotes()));
})

router.post('/notes', (req, res) => {
    const note = req.body;
    db.postNotes(note);
    // wait for this : res.status(200).send('wrote file successfully')
    console.log(note);
})

module.exports = router;