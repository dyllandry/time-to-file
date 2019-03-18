const fs = require('fs')
const path = require('path')

// write time on startup
writeTime()

// figure out when to next write to file
const now = new Date()
const currentSeconds = now.getSeconds()
const secondsUntilNextMinute = 60 - currentSeconds

// schedule next write when minute next changes
setTimeout(() => {
  writeTime()

  // set an interval to write from then on once every minute
  setInterval(() => {
    writeTime()
  }, 60 * 1000)

}, secondsUntilNextMinute * 1000)

function writeTime () {
  const timeString = getTimeString()
  fs.writeFile(`./time.txt`, timeString, error => {
    if (error) console.error(error) 
    else console.log(`Wrote time ${timeString} to ${path.resolve(__dirname, `./time.txt`)}`)
  }) 
}

function getTimeString () {
  const now = new Date()
  const currentMinutes = now.getMinutes()
  const formattedMinutes = (`0` + currentMinutes.toString()).slice(-2)
  const currentHour = now.getHours()
  const formattedHour = (`0` + currentHour.toString()).slice(-2)
  const timeString = `${formattedHour}:${formattedMinutes}`
  return timeString
}
