let notes = [
    {
        id: 1,
        title: "My First Note",
        timestamp: Date.now(),
        contents:
        " Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents, Note 1 contents"
    },
    {
        id: 2,
        title: "My Seconde Note",
        timestamp: Date.now(),
        contents:
        " Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents, Note 2 contents"
    }
];
let currentId = 3

function getNotes(searchTerm) {
    if (!searchTerm){
        return notes;
    }
    return notes.filter((note) => note.title.includes(searchTerm) || note.contents.includes(searchTerm))

    // `
    // SELECT * FROM notes
    // WHERE title LIKE %?%
    // `
}
// exports.getNotes = getNotes

// function getNote(id) {
//     return notes.find(note => note.id === id);
// }
// exports.getNote = getNote

function addNote(note){
    notes.push({
        ...note,
        // id: notes.length+1,
        id: currentId,
        timestamp: Date.now()
    })
    currentId++

}
exports.addNote = addNote

function deleteNote(id){
    notes = notes.filter((note) => note.id != id);
}
exports.deleteNote = deleteNote
