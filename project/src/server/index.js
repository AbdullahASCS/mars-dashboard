require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

app.get('/rovers/:selectedRover',async (req, res) =>{
   let {selectedRover} = req.params
    try{
        const max_sol = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/manifests/${selectedRover}/?API_KEY=${process.env.API_KEY}`
          )
            .then((res) => res.json())
            .then((res) => res.photo_manifest.max_sol);

        const images = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=${max_sol}&api_key=${process.env.API_KEY}`
        ).then((res)=> res.json());
        res.send(images);
    }
    catch (err){
        console.log(err);
    }
}

)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))