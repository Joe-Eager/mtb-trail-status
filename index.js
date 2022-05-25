import async from "async"
import axios from "axios"
import chalk from "chalk"
import fs from 'fs'
import jsonTable from './parks.js'

const jsonData = JSON.parse(fs.readFileSync('./secret/secret.json', 'utf-8'))

const url = jsonData.url
const auth = jsonData.auth

let dataStuff = {}, dataStuffTwo = {}, dataStuffThree = {}, dataStuffFour = {};

const scanner = (data, type) => {
  for (let i = 0; i < 20; i++) {
    const obj = data[i]
    const string = obj.text
    jsonTable(string, type)
    if (data.regex && data.bool) {
      data.tweet = string
      data.bool = false
      if (/open/i.test(string)) {
        data.status = 'O open'
        console.log('\n==========\n')
        console.log(chalk.green(data.name + data.status + '\n' + data.tweet))
      } else {
        data.status = 'X closed'
        console.log('\n==========\n')
        console.log(chalk.red(data.name + data.status + '\n' + data.tweet))
      }
    }
  }
}

const only = (data, json) => {
  console.log('\n==========\n')
  const obj = data[0]
  const string = JSON.stringify(obj.text)
  json.tweet = string
  if (/open/i.test(string)) {
    json.status = 'O open'
    console.log('\n==========\n')
    console.log(chalk.green(json.name + json.status + '\n' + json.tweet))
  } else {
    json.status = 'X closed'
    console.log('\n==========\n')
    console.log(chalk.red(json.name + json.status + '\n' + json.tweet))
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
      scanner(dataStuff, 'bedford'),
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
    console.log('\n==========\n')
    console.log(chalk.magenta('\nHAVE FUN GETTING HURT!'))
  }
])
