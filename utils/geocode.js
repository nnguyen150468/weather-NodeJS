const request = require('request');

const getGeocode = (res, city, callback) => {
    const token = process.env.MAPBOX;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
    ${encodeURIComponent(city)}.json?access_token=${token}`;

    request({ url: url, json:true }, (error, {body}) => {
        if(error){
            return res.render("index", {error: "cannot find your location"});
        }
        console.log('from geocode',body);
        const [long, lat] = body.features[0].geometry.coordinates;
        callback(res, body.features[0].place_name, long, lat)
    })
}

module.exports = getGeocode;