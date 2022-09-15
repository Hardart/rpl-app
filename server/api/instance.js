const axios = require('axios')

const instance = axios.create({
   baseURL: 'https://sportscore1.p.rapidapi.com/seasons/18936',
   headers: {
      'X-RapidAPI-Key': '634f40ab1dmshc056a9419dd46d7p19b876jsn3a80214a1344',
      'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com',
   },
})

module.exports = instance
