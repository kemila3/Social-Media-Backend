import express from "express"

const app = express();

app.use('/', (req,res,next) => {
    res.send("Hello world how u doin hehe")
})

app.listen(5000)