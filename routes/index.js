const router = require ("express").Router ();
const path = require ("path");
const apiRoutes = require ("./api/index");
router.get ("/", (req,res) => {
    res.sendFile (path.join(__dirname,"../public/index.html"))
});
router.get ("/notes", (req,res)=> {
    res.sendFile (path.join(__dirname,"../public/notes.html"))
});
router.use ("/api", apiRoutes)


module.exports = router