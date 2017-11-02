const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error(`Can't find this address. Please enter a valid address.`);
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/5acf8a0a5a23db31220640a4231a79e1/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`The temperature is ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers. Please try again later.');
    } else console.log(e.message);
});