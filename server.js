const express = require('express')
const app = express()
const database =require("./database")

const mysqlDatabase = require('./mysqlDatabase')


app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render("index.ejs",{
        numberOfItterations: 50
    })
})



app.get("/notes", async(req,res) =>{
    const searchTerm = req.query.searchTerm;
    const notes = await mysqlDatabase.getNotes(searchTerm);
    res.render("notes.ejs", {
        notes
    });
})

app.get("/notes/:id", async(req, res) => {
    const id = req.params.id
    const note = await mysqlDatabase.getNote(id)
    if (!note) {
        res.status(404).render("note404.ejs")
        return
    }
    // res.send(note)
    res.render("singleNote.ejs", {note}); 
})


app.get("/createNote", (req,res) =>{
    res.render("createNote.ejs")
})


app.post("/notes", async(req,res) =>{
    const data = req.body
    await mysqlDatabase.addNote(data)
    // res.send(data)
    res.redirect("/notes")


})

app.post("/notes/:id/delete", async(req, res)=>{
    const id = +req.params.id
    await mysqlDatabase.deleteNote(id)
    res.redirect("/notes")

})


app.use(express.static("public"))

const port = 8080
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})