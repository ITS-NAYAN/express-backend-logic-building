const express=require("express")

const app=express()

app.get("/",(req,res)=>{
    res.send("Hello from Express!")
})

app.get("/about",(req,res)=>{
    res.send("An about-page response")
})

app.get("/contact",(req,res)=>{
    res.status(200).send("Contact us at support@example.com")
})

app.use((req,res)=>{
    res.status(404).send("404 Not Found")
})

app.listen(3000,()=>{
    console.log("server started")
})