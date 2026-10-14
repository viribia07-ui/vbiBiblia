require("dotenv").config()

const express = require('express');
const app = express()

app.get("/gospel", (req, res)=>{
    const {passage = "Matthew"} = req.query
    const style = process?.env?.STYLE || "fullyformatted"
    const apiKey = process?.env?.API_KEY || "abc123"

    fetch(`https://api.biblia.com/v1/bible/content/LEB.html?passage=${passage}&style=${style}&key=${apiKey}`)
    .then(async(result)=>{
        console.log("GET /gopsel result: ", result);
        const gospelText = await result.text()
        return res.status(200).send(gospelText)
    })
    .catch((error)=>{
        console.warn(error);
        return res.status(403).send(`Bad Request. Error: ${error}.`)
    })
})

const PORT = process?.env.PORT || 3000
const HOST = process?.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, (error)=>{
    if (error) console.warn("Error: ", error);
    if (!error) console.log(`Express backend is running at ${HOST}: ${PORT}`);
    
})