const express = require('express');
const app = express();
const authRoutes = require("./routes/auth.routes")
app.get('/', (req, res)=>{
    res.send('hello world');
})
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.listen(5454, ()=>{
    console.log('server is running on port 5454');
})

