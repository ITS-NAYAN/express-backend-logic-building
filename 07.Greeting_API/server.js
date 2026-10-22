const express =require("express")
const app=express()

app.get("/greet/:name/:city", (req,res)=>{
    // console.log(req.params.name)
    res.send("Hello, " + req.params.name +"from "+ req.params.city)
})

app.use((req,res)=>{
    res.status(404).send("No Routes Match Invalid Request ")
})

app.listen(3000,()=>{
    console.log("server started")
})