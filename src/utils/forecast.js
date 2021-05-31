const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3467c1ce5d35fa095b5c9f12c4146938&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. Teplota je ' + body.current.temperature + '°C a pocitová teplota je ' + body.current.feelslike + '°C.')
        }
    })
}

module.exports = forecast