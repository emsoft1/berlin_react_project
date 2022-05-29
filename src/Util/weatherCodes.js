const codes = {
  "0": "Clear sky",
  "1": "Mainly clear",
  "2": "Partly cloudy",
  "3": "Overcast",
  "45": "Fog",
  "48": "Depositing rime fog",
  "51": "Drizzle: Light",
  "53": "Drizzle: moderate",
  "55": "Drizzle: dense",
  "56": "Dense Freezing Drizzle",
  "57": "Light Freezing Drizzle",
  "61": "Light Rain",
  "63": "Moderate Rain",
  "65": "Heavy Rain",
  "66": "Light Freezing Rain",
  "67": "Heavy Freezing Rain",
  "71": "Light Snow fall",
  "73": "Moderate Snow fall",
  "75": "Heavy Snow fall",
  "77": "Snow grains",
  "80": "Light Rain showers",
  "81": "moderate Rain showers",
  "82": "Violent Rain showers",
  "85": "Light Snow showers",
  "86": "Heavy Snow showers",
  "95": "Thunderstorms",
  "96": "Thunderstorm with slight hail",
  "99": "Thunderstorm with heavy hail"
}

export default function weatherCode(code){
  return codes[code]
}