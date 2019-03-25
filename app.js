const ADDS = require('adds')

ADDS('metars', {
  stationString: 'KNIP', //NAS JAX ICAO
  hoursBeforeNow: 1
})
  .then(metars => {
    //console.log(metars[0]); //METAR for NAS JAX
    var wsk = parseInt(metars[0].wind_speed_kt); //Winds in knots parsed into integer
    var a = 1.151; //knots to mph calculation magic number 1 knot = 1.151 MPH
    let wsm = a * wsk; //knots converted to MPH
    var b = 2.237; //MPH to MPS calculation magic number 2.237
    let mps = wsm / b; //MPH converted to MPS
    var slp = parseInt(metars[0].sea_level_pressure_mb); //Sea level pressure parsed into integer
    var wdd = parseInt(metars[0].wind_dir_degrees); //Wind Direction parsed into integer
    console.log(wsm, slp, wdd, mps);
    //wsm = Wind speed mph
    //slp = Sea Level pressure
    //wdd = Wind direction in degrees
    //mps = Wind meters per second
  })
