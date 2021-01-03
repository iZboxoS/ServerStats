const si = require('systeminformation');
const config = require('./config.json');
const start = Date.now();



//--Ram--
var systemInformation = require('nodejs-system-info');
 
const INTERVAL = 500;
 
const systemMonitor = new systemInformation(INTERVAL);
 
systemMonitor.log(['ram']);
systemMonitor.log(['cpu']);
//-------


const express = require('express');
const app = express()
 
app.set('view engine', 'ejs')

//--Uptime--
function dhm(ms){
  days = Math.floor(ms / (24*60*60*1000));
  daysms=ms % (24*60*60*1000);
  hours = Math.floor((daysms)/(60*60*1000));
  hoursms=ms % (60*60*1000);
  minutes = Math.floor((hoursms)/(60*1000));
  minutesms=ms % (60*1000);
  sec = Math.floor((minutesms)/(1000));
  return `<b>${days}</b>d <b>${hours}</b>h <b>${minutes}</b>m <b>${sec}</b>s`
}
//----------

//--Express--
app.get('/', async function (req, res) {
    var dataCPU = await si.cpu();
    var dataTemperature = await si.cpuTemperature();
    var p = await si.time().uptime;
    var x = Math.round(dataTemperature.main, 2);
    var z = systemMonitor.get(['ram']);
    var l = systemMonitor.get(['cpu'])

res.render("index",{
    a: x,
    tmp: dhm(Date.now() - start),
    up: p,
    mnt: z.RAM_Usage,
    mny: l.CPU_Usage
})


 })
console.log("Running")
console.log(`${config.address}:${config.port}`)

app.listen(config.port)

