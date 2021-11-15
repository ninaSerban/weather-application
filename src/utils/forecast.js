const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
     const url = 'http://api.weatherstack.com//current?access_key=37a015a11e084d9d89305a7981e694e4&query=' + latitude + ',' + longitude
     request({url, json:true},(error, { body }) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'' + body.current.weather_descriptions[0] + ', temperature: ' + body.current.temperature + ', feelsLike: ' + body.current.feelslike + '')
        }
    })
}
module.exports = forecast