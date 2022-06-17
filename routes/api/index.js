const router = require ("express").Router();
const { ok } = require("assert");
const fs = require ("fs");
const util = require ("util");
const {v4:uuidv4} = require ("uuid")
const readFile = util.promisify (fs.readFile);
const writeFile = util.promisify (fs.writeFile);
router.get ("/notes", (req,res)=>{
    getNotes ().then (notesArray => res.json(notesArray)).catch (err=>res.json (err))
   
})

router.post ("/notes", (req,res)=> {
    const newNote = {title: req.body.title, text: req.body.text, id: uuidv4()}
    console.log (newNote)
    getNotes().then (notesArray=> [...notesArray,newNote]).then (newArray => {
        writeFile ("db.json", JSON.stringify(newArray))
    }).then (()=>res.json({
        msg:"ok"
    }))
})

function getNotes () {
    return readFile ("db.json", "utf-8").then (notes => {
        let notesArray = [];
        try {
            notesArray = notesArray.concat (JSON.parse (notes))
        } catch (err) {
            notesArray = []
        }
        return notesArray
    })
}

module.exports=router