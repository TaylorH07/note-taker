const util = require('util')
const fs = require('fs');
var { v1: uuidv1 } = require('uuid');
// const { response } = require('express');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let parNotes;
            try { parNotes = [].concat(JSON.parse(notes));
            } 
            catch (err) {
                parNotes = [];
            } 
            return parNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Empty note, try again.')
        }

        const addNote = { title, text, id: uuidv1() }
        return this.getNotes()
            .then(notes => [...notes, addNote])
            .then(updatedNotes => this.write(updatedNotes))
        .then(() => addNote);
    }

    removeNote(id) {
        return this.getNotes()
        .then((remove) => remove.filter(removedNote => removedNote.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new DB();
