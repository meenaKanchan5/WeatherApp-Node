const request = require('postman-request')
const forecast = (lat,long, callback )=>{
    const url ='http://api.weatherstack.com/current?access_key=428e0c88d5ddbafee61890df639bcbe9&query='+ lat + ','+ long +'&units=m'
    request({url, json:true},(error, {body})=>{ // replacing response with body using object destructuring
       if(error)
       {
        callback('Unable to connect to forecast service',undefined)
       }else if(body.error)
       {
        callback('Unable to find the forecast of enter location',undefined)
       }
       else{
        callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree out. It feels like "+ body.current.feelslike +" degree out")
       }

    })

}

module.exports = forecast
// const url ="http://api.weatherstack.com/current?access_key=428e0c88d5ddbafee61890df639bcbe9&query=37.8267,-122.4233&units=f"
// request({url:url,json:true},(error,response)=>{
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//    // console.log(response.body.current);
//    if(error)
//    {
//     console.log("Unable to connect to weather service");
//    }else if(response.body.error)
//    {
//     console.log("Unable to find")
//    }else{
//     console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degree out. It feels like "+ response.body.current.feelslike +" degree out")
//    }

// })