// To convert temperatures in degrees Celsius to Fahrenheit, multiply by 1.8 (or 9/5) and add 32.
// (C × 9/5) + 32 = F
const celsiusToFahrenheit = (C) => {
  return ((C*9/5)+32).toFixed(2)
}

// There are 0.62137119223733 miles per hour in 1 kilometer per hour. To convert from kilometers per hour to miles per hour, 
// multiply your figure by 0.62137119223733 (or divide by 1.609344)
// kph / 1.609344 = mph
const kilometersTomiles = (km) => {
  return (km/1.609344).toFixed(2)
}

export {celsiusToFahrenheit, kilometersTomiles}