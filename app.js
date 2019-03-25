const ADDS = require('adds')

ADDS('metars', {
  stationString: 'KNIP',
  hoursBeforeNow: 1
})
  .then(metars => {
    console.log(JSON.stringify(metars, null, 2))
  })
