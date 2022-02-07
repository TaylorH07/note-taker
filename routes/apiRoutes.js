const router = require('express').Router();
const db = require('../db/db.js');


// GET router
router.get('/notes', (req,res) => {

    db.getNotes().then(notes => res.json(notes))
});

// POST router 
router.post('/notes', (req, res) => {

    db.addNote(req.body).then(note => res.json(note));
});

//DELETE router
router.delete('/notes/:id', (req, res) => {

    db.removeNote(req.params.id).then(() => res.json({ ok: true }));
});


module.exports = router;