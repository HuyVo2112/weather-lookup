const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const access_key = "0bda46dc95e1895f0d9f80dc3fec8602";
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Cannot connect to the weather API", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            console.log(body);
            callback(undefined, {
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + " degress",
            });
        }
    })
};

module.exports = forecast;
