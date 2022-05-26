import async from "async"
import axios from "axios"
import chalk from "chalk"
import fs from 'fs'
import jsonTable from './parks.js'

const jsonData = JSON.parse(fs.readFileSync('./secret/secret.json', 'utf-8'))

const url = jsonData.url
const auth = jsonData.auth

let dataStuff = {}, dataStuffTwo = {}, dataStuffThree = {}, dataStuffFour = {};

const scanner = (data, type, bool) => {
  for (let i = 0; i < data.length; i++) {
    const obj = data[i]
    const string = obj.text
    const param = jsonTable(string, type)
    if (param.regex && bool) {
      param.tweet = string
      bool = false
      if (/open/i.test(string)) {
        param.status = 'O open'
        console.log('\n==========\n')
        console.log(chalk.green(param.name + '\n' + param.status + '\n' + param.tweet))
      } else {
        param.status = 'X closed'
        console.log('\n==========\n')
        console.log(chalk.red(param.name + '\n' + param.status + '\n' + param.tweet))
      }
    }
  }
}

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
    console.log('\n==========\n')
    console.log(chalk.magenta('\nHAVE FUN GETTING HURT!'))
  }
])
