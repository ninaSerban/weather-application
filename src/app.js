
const hbs = require('hbs')
const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//Set up handlebars engine and views location
app.set('view engine','hbs') // set up handlebars for dynamic pages
app.set('views',viewsPath) // pointing express to a custom directory
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title:"Weather",
        name:"Nina",
        message:"Use this site to get your weather!"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:"About me",
        name:"Nina"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMessage:"Useful stuff.",
        title: 'Help',
        name: 'Nina'
    })
})



app.get('/weather',( req,res ) => {
    if(!req.query.address){
        return res.send ({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
});

//Query string example
app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help/*', (req,res) => {
    res.render('help', {
        title:"Help article not found.",
        name: 'Nina'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title:"404",
        errorMessage:"Page not found :(",
        name: 'Nina'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
});


