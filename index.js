import async from 'async'
// import axios from "axios";
import chalk from 'chalk'
import fs from 'fs'
import jsonTable from './parks.js'

// const jsonData = JSON.parse(fs.readFileSync("./secret/secret.json", "utf-8"));
const jsonFile = JSON.parse(fs.readFileSync('./output.json', 'utf-8'))
const goData = JSON.parse(fs.readFileSync('../scrape/output.json'))

// const url = jsonData.url;
// const auth = jsonData.auth;

// let dataStuff = {},
//   dataStuffTwo = {},
//   dataStuffThree = {},
//   dataStuffFour = {};

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1)
  let minutes = (ms / (1000 * 60)).toFixed(1)
  let hours = (ms / (1000 * 60 * 60)).toFixed(1)
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
  if (seconds < 60) return seconds + ' sec ago'
  else if (minutes < 60) return minutes + ' min ago'
  else if (hours < 24) return hours + ' hrs ago'
  else return days + ' days ago'
}

const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const scanner = (data, type, bool) => {
  for (let i = 0; i < 50; i++) {
    const obj = data[i]
    const string = obj.tweet
    const param = jsonTable(string, type)
    if (param.regex && bool) {
      const time = obj.time
      console.log(new Date(time))
      if (isToday(new Date(obj.time))) {
        jsonFile[type].time = 'Today'
      } else {
        jsonFile[type].time = msToTime(new Date() - new Date(obj.time))
      }
      jsonFile[type].tweet = string
      bool = false
      if (/open/i.test(string)) {
        jsonFile[type].status = true
        console.log(
          chalk.green(
            jsonFile[type].name +
            ' - Open || Last tweeted: ' +
            jsonFile[type].time
          )
        )
      } else {
        jsonFile[type].status = false
        console.log(
          chalk.red(
            jsonFile[type].name +
            ' - Closed || Last tweeted: ' +
            jsonFile[type].time
          )
        )
      }
    }
  }
}

async.series([
  //   function (callback) {
  //     axios({
  //       method: "GET",
  //       url: url.cleMetro,
  //       headers: {
  //         Authorization: auth,
  //         "Access-Control-Allow-Origin": true,
  //       },
  //     }).then(
  //       (res) => {
  //         dataStuff = res.data.data;
  //         callback(null, dataStuff);
  //       },
  //       (err) => {
  //         console.log(err);
  //         callback(err, null);
  //       }
  //     );
  //   },
  //   function (callback) {
  //     axios({
  //       method: "GET",
  //       url: url.eastRim,
  //       headers: {
  //         Authorization: auth,
  //         "Access-Control-Allow-Origin": true,
  //       },
  //     }).then(
  //       (res) => {
  //         dataStuffTwo = res.data.data;
  //         callback(null, dataStuffTwo);
  //       },
  //       (err) => {
  //         console.log(err);
  //         callback(err, null);
  //       }
  //     );
  //   },
  //   function (callback) {
  //     axios({
  //       method: "GET",
  //       url: url.hampHill,
  //       headers: {
  //         Authorization: auth,
  //         "Access-Control-Allow-Origin": true,
  //       },
  //     }).then(
  //       (res) => {
  //         dataStuffThree = res.data.data;
  //         callback(null, dataStuffThree);
  //       },
  //       (err) => {
  //         console.log(err);
  //         callback(err, null);
  //       }
  //     );
  //   },
  //   function (callback) {
  //     axios({
  //       method: "GET",
  //       url: url.vulture,
  //       headers: {
  //         Authorization: auth,
  //         "Access-Control-Allow-Origin": true,
  //       },
  //     }).then(
  //       (res) => {
  //         dataStuffFour = res.data.data;
  //         callback(null, dataStuffFour);
  //       },
  //       (err) => {
  //         console.log(err);
  //         callback(err, null);
  //       }
  //     );
  //   },
  function () {
    scanner(goData.CMPmtb, 'bedford', true)
    scanner(goData.CVNPmtb, "eastRim", true);
    scanner(goData.SMPmountainbike, "hampHill", true);
    scanner(goData.CMPmtb, "OECR", true);
    scanner(goData.CMPmtb, "royalView", true);
    scanner(goData.CMPmtb, "westCreek", true);
    scanner(goData.VulturesKnobMTB, "vulturesKnob", true);
    jsonFile.update.time = goData.lastUpdated
    console.log(goData.lastUpdated)
    fs.writeFileSync(
      '../trail-status/src/parts/output.json',
      JSON.stringify(jsonFile, null, 2),
      'utf8',
      function (err) {
        if (err) {
          return console.log(err)
        }

        console.log(new Date().toString())
      }
    )
  }
])
