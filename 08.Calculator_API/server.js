const express=require("express")

const app=express()



app.get('/calculate', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const op = req.query.op;

    let result;

    if (op === 'add') {
        result = a + b;
    } 
    else if (op === 'subtract') {
        result = a - b;
    } 
    else if (op === 'multiply') {
        result = a * b;
    } 
    else if (op === 'divide') {
        if (b === 0) {
            return res.status(400).json({
                error: 'Cannot divide by zero'
            });
        }
        result = a / b;
    } 
    else {
        return res.status(400).json({
            error: 'Invalid operation'
        });
    }

    res.json({ result });
});

app.listen(3000, ()=>{
    console.log("SERVER STARTED")
})