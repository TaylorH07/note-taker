const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const db = require('../db/db.js');


// GET router
router.get('/api/notes', (req,res) => {
    //res.status(200).json(JSON.parse(db.getNotes()));

    let getData = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

    res.json(getData);
});

// POST router 
router.post('/api/notes', (req, res) => {
    //new note from request body
    const newEntry = req.body;

    //id obtained from uuid package
    newEntry.id = uuidv4();

    //read data in json
    let getData = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

    //new entry in db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(getData));

    //sends data response
    response.json(getData);

    // wait for this : res.status(200).send('wrote file successfully')
    //console.log(newEntry);
});

//DELETE router
// router.delete('/api/notes/:id', (req, res) => {
//     let notesId = req.params.id.toString();

//     let getData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

//     const newEntry = getData.filter( note => note.id.toString() !== notesId );

//     fs.writeFileSync('./db/db.json', JSON.stringify(newEntry));

//     response.json(newEntry);
// });


module.exports = router;