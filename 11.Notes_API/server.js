const express = require("express");

const app = express();
app.use(express.json());

const notes=[{id:1,title:"Learn React", content:"Frontend programming language"},
    {id:2,title:"Learn DSA", content:"Learn DSA For advance logic building"},
    {id:3,title:"Learn Database", content:"Learn Database for managing data"}
]

app.get("/notes", (req,res)=>{
    res.send(notes)
})

app.get("/notes/:id", (req,res)=>{
    const id= Number(req.params.id);
    const note = notes.find(notes => notes.id === id);
    res.send(note)

})

app.post("/notes", (req, res) => {
    const { title } = req.body;
    const {content}= req.body;

    const newNotes = {
        id: notes.length
            ? Math.max(...notes.map(notes => notes.id)) + 1
            : 1,
        title: title.trim(),
        content: content.trim()
    };

    notes.push(newNotes);
    res.status(201).json(newNotes);
});

app.put("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find(note => note.id === id);

    const { title, content } = req.body;

    note.title = title;
    note.content = content;

    res.status(200).json({
        message: "Note updated successfully",
        note: note
    });
});

app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = notes.findIndex(note => note.id === id);

    const deletedNote = notes.splice(index, 1);

    res.status(200).json({
        message: "Note deleted successfully",
        note: deletedNote[0]
    });
});


app.listen(3000, ()=>{
    console.log("SERVER STARTED")
})