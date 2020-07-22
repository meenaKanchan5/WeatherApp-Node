const path = require('path')
const express = require ('express')
const { response } = require('express')
const hbs  = require('hbs')
const app = express()
const forecast = require('./util/forecast.js')
const geocode = require('./util/geocode.js')
//define path for express config
const viewpaths = path.join(__dirname,'../template/views')
const publicdirpath = path.join(__dirname,'../public')
const partialspath = path.join(__dirname,'../template/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewpaths)
hbs.registerPartials(partialspath)
//set up static directory to serve
app.use(express.static(publicdirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:' Kanchan ',
        text :"Use this site to get weather reports"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        aboutText:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        title:"About Page",
        name:' Kanchan '
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{

        helpText:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",

        title:"Help Page Me",
        name:' Kanchan '
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address '
        })
    }
    geocode(req.query.address,(error,{latitude,longitute,location} = {})=>{
        if(error){
            return res.send({ error})
        }
        forecast(latitude,longitute,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location:location,
            //   /  address:req.query.address
            })
        })
    })

})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search here'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('pagenotfound',{
        text:"help Article  not found"
    })
})
// setting 404 page
app.get('*',(req,res)=>{

    res.render('pagenotfound',{
        text:"Page not found"
    })

})
app.listen(3000,()=>{

    console.log('Server is up on port 3000')

})

//app.get('route',function ) function describe what we want to do
 //function argument  req - rquest response - what gona send back

//app.com