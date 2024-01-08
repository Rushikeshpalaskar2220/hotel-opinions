const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

const PORT = 5000;

app.use(cors())
app.use(express.json())

app.post('/opinions',async(req,res) => {
    try {
    const opinion = await req.body
    const {name, comments} = opinion
    const result = await pool.query("INSERT INTO opinions (name, comments) VALUES($1,$2) RETURNING *",[name,comments])
    return res.json({message:"Opinion Saved Successfully", result})
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server started running PORT ${PORT}`);
})