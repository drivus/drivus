var lyft = require('./lyft.js');
var uber = require('./uber.js');
var genRadius = require('./generate_radius.js')

function checkIfOptimalPrice(rideOptions, optimalPrice) {
  if (!optimalPrice.ride) {
    optimalPrice.ride = rideOptions.rides[0]
    optimalPrice.coords = rideOptions.coords
<<<<<<< 8f818bf7fd9c701fbf1c1ed8013ce82de28936e2
  }
  rideOptions.rides.forEach(function(option) {
    // console.log('Option: ', option);
    // console.log('Current Min Price: ', optimalPrice);
    if (option.avg_estimate < optimalPrice.ride.avg_estimate && option.display_name !== 'UberTAXI') {
=======
  } 
  rideOptions.rides.forEach((option) => {
    if (option.avg_estimate < optimalPrice.ride.avg_estimate && option.display_name !== 'uberTAXI') {
>>>>>>> [fixes] Commented code, removeds some console.logs, migrated towards es6,
      optimalPrice.ride = option;
      optimalPrice.coords = rideOptions.coords
    }
    if (option.avg_estimate === optimalPrice.ride.avg_estimate && option.display_name !== 'uberTAXI') {
      if ((option.eta + option.duration < optimalPrice.ride.eta + optimalPrice.ride.duration ) || 
          option.distance < optimalPrice.ride.distance) {
        optimalPrice.ride = option;
        optimalPrice.coords = rideOptions.coords
      }
    }
  })
  console.log('OPTIMAL PRICE OPTION: ', 'Product: ', optimalPrice.ride.display_name,  'Estimate: ',  optimalPrice.ride.avg_estimate,  'TotalTime: ',  optimalPrice.ride.eta + optimalPrice.ride.duration,  'Coords: ',  optimalPrice.coords.start);
  return optimalPrice
}

function checkIfOptimalTime(rideOptions, optimalTime) {
  if (!optimalTime.ride) {
    optimalTime.ride = rideOptions.rides[0]
    optimalTime.coords = rideOptions.coords
<<<<<<< 8f818bf7fd9c701fbf1c1ed8013ce82de28936e2
  }
  rideOptions.rides.forEach(function(option) {
=======
  } 
  rideOptions.rides.forEach((option) => {
>>>>>>> [fixes] Commented code, removeds some console.logs, migrated towards es6,
    if ((option.duration + option.eta) < (optimalTime.ride.duration + optimalTime.ride.eta)  && option.display_name !== 'uberTAXI') {
      optimalTime.ride = option;
      optimalTime.coords = rideOptions.coords;  
    }
    if ((option.duration + option.eta) === (optimalTime.ride.duration + optimalTime.ride.eta)  && option.display_name !== 'uberTAXI') {
      if (option.avg_estimate < optimalTime.ride.avg_estimate || option.distance < optimalTime.ride.distance) {
        optimalTime.ride = option;
        optimalTime.coords = rideOptions.coords;  
      } 
    }
  })
  console.log('OPTIMAL TIME OPTION: ', 'Product: ', optimalTime.ride.display_name,  'Estimate: ',  optimalTime.ride.avg_estimate,  'TotalTime: ',  optimalTime.ride.eta + optimalTime.ride.duration,  'Coords: ',  optimalTime.coords.start);
  return optimalTime
}

// Receives the user's selected starting location
function expandSearch(startCoords) {
  var uberPromiseList = [];
  var lyftPromiseList = [];
<<<<<<< 8f818bf7fd9c701fbf1c1ed8013ce82de28936e2

  return genRadius.createGeoRadius(startCoords)
    .then(function(data) {
      console.log('Initial Results: ', data);

      data.forEach(function(coordPair) {
        console.log('Testing: ', coordPair);
=======
  
  return genRadius.createGeoRadius(startCoords) // generates a radius of GPS points around a starting point
    .then((data) => {
      data.forEach((coordPair) => { // For all coordinates around starting point, generates Start and End pairs based on destination
>>>>>>> [fixes] Commented code, removeds some console.logs, migrated towards es6,
        var newStartEnd = {
          start: coordPair,
          end: startCoords.end
        }
        uberPromiseList.push(uber.uberRequest(newStartEnd))
        lyftPromiseList.push(lyft.lyftRequest(newStartEnd))
      })

      return Promise.all([Promise.all(uberPromiseList), Promise.all(lyftPromiseList)]);
    })
    .catch(function(err) {
    })
}


module.exports.expandSearch = expandSearch;
module.exports.checkIfOptimalPrice = checkIfOptimalPrice;
module.exports.checkIfOptimalTime = checkIfOptimalTime;
