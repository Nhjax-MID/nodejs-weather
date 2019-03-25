var request = require('request');

var headers = {
  'User-Agent': 'NMRTC WEATHER APP',
  'Content-Type' : 'application/ld+json',
  'Accept' : 'application/ld+json'
}
request({
  headers: headers,
  url: 'https://api.weather.gov/alerts?active=true&zone=FLZ025',
  method: 'GET'
 }, function (err, res, body) {
 	if (res.statusCode === 200) {
 		console.log(body);
 	} else if (err) {
 		console.log(err);
 	}
 });




/*    .then(metars => {
      console.log(JSON.stringify(metars, null, 2))
    })

*/







/*var req = require('request');

req.post({
   url: 'https://alerts.weather.gov/cap/wwaatmget.php?x=FLC031&y=1',
   headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
      'Content-Type' : 'application/ld+json'
   },
   method: 'GET'
  },

  function (e, r, body) {
      console.log(body);
  });
*/


/*sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});
*/

/*axios.get('http://alerts.weather.gov/cap/us.php?x=0')
.then((response) => {
  let parser= parser.stream(response.data);
  let es= es.stringify(parser);
  console.log(es);
})
.catch(err => {
  console.log(err.response);
});
*/
