const request = require('request');

var weather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/5acf8a0a5a23db31220640a4231a79e1/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else callback('Something went wrong. Please try again later.');
    });
};

module.exports = {
    weather
};