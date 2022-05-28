import async from "async"
import axios from "axios"
import chalk from "chalk"
import fs from 'fs'
import jsonTable from './parks.js'

const jsonData = JSON.parse(fs.readFileSync('./secret/secret.json', 'utf-8'))
const jsonFile = JSON.parse(fs.readFileSync('./output.json', 'utf-8'))

const url = jsonData.url
const auth = jsonData.auth

let dataStuff = {}, dataStuffTwo = {}, dataStuffThree = {}, dataStuffFour = {}

const scanner = (data, type, bool) => {
  for (let i = 0; i < data.length; i++) {
    const obj = data[i]
    const string = obj.text
    const param = jsonTable(string, type)
    if (param.regex && bool) {
      jsonFile[type].tweet = string
      bool = false
      if (/open/i.test(string)) {
        jsonFile[type].status = true
        console.log(chalk.green(jsonFile[type].name + ' - Open'))
      } else {
        jsonFile[type].status = false
        console.log(chalk.red(jsonFile[type].name + ' - Closed'))
      }
    }
  }
}

var minutes = 5, the_interval = minutes * 60 * 1000

setInterval(function () {
  async.series([
    function (callback) {
      axios({
        method: 'GET',
        url: url.cleMetro,
        headers: {
          Authorization: auth,
          "Access-Control-Allow-Origin": true
        }
      }).then((res) => {
        dataStuff = res.data.data
        callback(null, dataStuff)
      },
        (err) => {
          console.log(err)
          callback(err, null)
        }
      )
    },
    function (callback) {
      axios({
        method: 'GET',
        url: url.eastRim,
        headers: {
          Authorization: auth,
          "Access-Control-Allow-Origin": true
        }
      }).then((res) => {
        dataStuffTwo = res.data.data
        callback(null, dataStuffTwo)
      },
        (err) => {
          console.log(err)
          callback(err, null)
        }
      )
    },
    function (callback) {
      axios({
        method: 'GET',
        url: url.hampHill,
        headers: {
          Authorization: auth,
          "Access-Control-Allow-Origin": true
        }
      }).then((res) => {
        dataStuffThree = res.data.data
        callback(null, dataStuffThree)
      },
        (err) => {
          console.log(err)
          callback(err, null)
        }
      )
    },
    function (callback) {
      axios({
        method: 'GET',
        url: url.vulture,
        headers: {
          Authorization: auth,
          "Access-Control-Allow-Origin": true
        }
      }).then((res) => {
        dataStuffFour = res.data.data
        callback(null, dataStuffFour)
      },
        (err) => {
          console.log(err)
          callback(err, null)
        }
      )
    },
    function () {
      scanner(dataStuff, 'bedford', true)
      scanner(dataStuffTwo, 'eastRim', true)
      scanner(dataStuffThree, 'hampHill', true)
      scanner(dataStuff, 'OECR', true)
      scanner(dataStuff, 'royalView', true)
      scanner(dataStuff, 'westCreek', true)
      scanner(dataStuffFour, 'vulturesKnob', true)
      jsonFile.update = new Date().toLocaleTimeString()
      fs.writeFile('C:/Users/Joe/Code/trail-status/src/parts/output.json', JSON.stringify(jsonFile, null, 2), 'utf8', function (err) {
        if (err) {
          return console.log(err)
        }

        console.log(new Date().toLocaleTimeString())
      })
    }
  ])
}, the_interval)