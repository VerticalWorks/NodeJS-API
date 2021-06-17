import express from 'express';
import axios from 'axios';

const weatherRouter = express.Router();
const weatherToken = 'bdfa2472c96699d8c0f3d2331abdd21c';

weatherRouter.get('/weather', function (req: any, res: any) {
  //I would do some general query housekeeping here
  //perhaps checking for edge case combos before making the call :)
  
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&exclude=${req.query.exclude}&appid=${weatherToken}&units=${'imperial'}`)
  .then(function (response){
    response.data['bano_data'] = {};
    response.data.bano_data['temp_summary'] = createEnglishTemp(response.data.current.temp);
    response.data.bano_data['weather_status'] = response.data.current.weather[0].main;
    response.data.bano_data['alerts'] = getAlertEvent(response.data);
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(`ERROR: ${error}`);
  });

})

weatherRouter.get('/', function (req: any, res: any) {
  res.send('Weather API home page');
})

function createEnglishTemp(temp: number): string {
  
  if (temp === undefined){
    return "na";
  }
  if (temp <= 30){
    return "Cold";
  }
  if(temp <= 60){
    return "Moderate"
  }
  if(temp <= 120){
    return "Hot"
  } 
  if(temp <= 320){
    return "Excuriating"
  }else{
    return "na"
  }   
  
}

function getAlertEvent(data:any): string[]{
  let retVal =  ["No Alerts"];
  if(data.alerts === undefined){
     return retVal;
  }
  let alerts = [...data.alerts]
  let result = alerts.map(({ event }) => event)
  return result;
}

module.exports = weatherRouter;