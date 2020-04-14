var express = require('express');
var router = express.Router();

const getGeocode = require('../utils/geocode')
const getWeather = require('../utils/getWeather')
const getCurrentLocation = require('../utils/getCurrentLocation')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Weather App' });

  getCurrentLocation(res, null);
});

router.get("/weather", (req, res) => {
  if(!req.query.city){
    return res.render("index", {
      greeting: "Hello! Enter the name of the place you want to get weather forecast!",
      title: "My Weather App"
    });
  }
  getGeocode(res, req.query.city, getWeather)
})

module.exports = router;
