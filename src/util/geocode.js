const request = require('postman-request')
const geoCode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2FuY2hhbjEyIiwiYSI6ImNrY3FmZ2NkajE0YXUycmxmcHpwbHJ0anYifQ.laDF2Zk_XDywWWsWpDApGA&limit=1'
    request({url, json:true} , (error,{body})=>{
        if(error)
        {
            callback('Unable to connect to location service',undefined)
        }
        else if (body.features.length===0)
        {
            callback('Unable to find location , please try later!',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitute:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode

//Geocoding

// const geourl ="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2FuY2hhbjEyIiwiYSI6ImNrY3FmZ2NkajE0YXUycmxmcHpwbHJ0anYifQ.laDF2Zk_XDywWWsWpDApGA&limit=1"

// request({url:geourl,json:true},(error,response)=>{
//     if(error)
//     {
//     console.log("Unable to connect to location service");
//     }
//     else if(response.body.features.length===0)
//     {
//         console.log("No match found")
//     }
//     else{
//         console.log("latitude = " + response.body.features[0].center[0] + " longitute = " + response.body.features[0].center[1] );
//     }

// })