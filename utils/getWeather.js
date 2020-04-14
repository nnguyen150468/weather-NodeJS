const request = require('request');
const moment = require('moment');

function getWeather(res, city, long,lat){
    let url = `https://api.darksky.net/forecast/${process.env.DARKSKY}/${lat},${long}`
    request({url:url, json:true}, (err, {body})=> {
        if(err){
            return res.render("index", {error: "Cannot get the weather!"})
        }
        console.log('currently:', body.currently);

        let hourlyData = body.hourly.data.slice(0,6);
        for(let i=0; i<hourlyData.length; i++){
            hourlyData[i].temperature = Math.round(hourlyData[i].temperature);
            hourlyData[i].celcius = Math.round((hourlyData[i].temperature-32)*5/9);
            hourlyData[i].time = moment(hourlyData[i].time, 'X').format('h A');
        }



        res.render("index", {
            city: city,
            currently: {
                time: moment(body.currently.time, 'X').format('hh:mm A'),
                summary: body.currently.summary,
                precipitation: body.currently.precipIntensity*10000,
                temperature: Math.round(body.currently.temperature),
                celcius: Math.round((body.currently.temperature-32)*5/9),
                humidity: Math.round(body.currently.humidity*100),
                windSpeed: body.currently.windSpeed
            },
            hourly: {
                data: hourlyData
            },
            daily: {
                data: body.daily.data
            }
        })
    })
}

module.exports = getWeather