import async from "async"
import axios from "axios"
import chalk from "chalk"
import fs from 'fs'
import jsonTable from './parks.js'
const jsonData = JSON.parse(fs.readFileSync('./secret/secret.json', 'utf-8'))
const url = jsonData.url
const auth = jsonData.auth

var dataStuff = {}
var dataStuffTwo = {}
var dataStuffThree = {}
var dataStuffFour = {}

const scanner = (data, type) => {
  for (let i = 0; i < 20; i++) {
    const obj = data[i]
    const string = obj.text
    jsonTable(string, type)
    if (json.regex && json.bool) {
      json.tweet = string
      json.bool = false
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
      console.log(dataStuff)
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
  scanner(dataStuff, 'bedford'),
  function () {
    console.log('\n==========\n')
    var obj2 = dataStuffTwo[0]
    var string2 = JSON.stringify(obj2.text)
    jsonTable.eastRim.tweet = string2
    if (/open/i.test(string2)) {
      jsonTable.eastRim.status = 'O open'
      console.log(chalk.green('\nEast Rim:\n' + jsonTable.eastRim.status + '\n' + jsonTable.eastRim.tweet))
    } else {
      jsonTable.eastRim.status = 'X closed'
      console.log(chalk.red('\nEast Rim:\n' + jsonTable.eastRim.status + '\n' + jsonTable.eastRim.tweet))
    }
    console.log('\n==========\n')
    var obj3 = dataStuffThree[0]
    var string3 = JSON.stringify(obj3.text)
    jsonTable.hampHill.tweet = string3
    if (/open/i.test(string3)) {
      jsonTable.hampHill.status = 'O open'
      console.log(chalk.green('\nHampton Hills:\n' + jsonTable.hampHill.status + '\n' + jsonTable.hampHill.tweet))
    } else {
      jsonTable.hampHill.status = 'X closed'
      console.log(chalk.red('\nHampton Hills:\n' + jsonTable.hampHill.status + '\n' + jsonTable.hampHill.tweet))
    }
    for (let i = 0; i < dataStuff.length; i++) {
      var obj = dataStuff[i]
      var string = JSON.stringify(obj.text)
      if (/bedford/i.test(string) && jsonTable.bedford.bool) {
        jsonTable.bedford.tweet = string
        jsonTable.bedford.bool = false
        if (/open/i.test(string)) {
          jsonTable.bedford.status = 'O open'
          console.log('\n==========\n')
          console.log(chalk.green('\nBedford:\n' + jsonTable.bedford.status + '\n' + jsonTable.bedford.tweet))
        } else {
          jsonTable.bedford.status = 'X closed'
          console.log('\n==========\n')
          console.log(chalk.red('\nBedford:\n' + jsonTable.bedford.status + '\n' + jsonTable.bedford.tweet))
        }
      }
      if (/west\screek/i.test(string) && jsonTable.westCreek.bool) {
        jsonTable.westCreek.tweet = string
        jsonTable.westCreek.bool = false
        if (/open/i.test(string)) {
          jsonTable.westCreek.status = 'O open'
          console.log('\n==========\n')
          console.log(chalk.green('\nWest Creek:\n' + jsonTable.westCreek.status + '\n' + jsonTable.westCreek.tweet))
        } else {
          jsonTable.westCreek.status = 'X closed'
          console.log('\n==========\n')
          console.log(chalk.red('\nWest Creek:\n' + jsonTable.westCreek.status + '\n' + jsonTable.westCreek.tweet))
        }
      }
      if (/royalview/i.test(string) && jsonTable.royalView.bool) {
        jsonTable.royalView.tweet = string
        jsonTable.royalView.bool = false
        if (/open/i.test(string)) {
          jsonTable.royalView.status = 'O open'
          console.log('\n==========\n')
          console.log(chalk.green('\nRoyalview:\n' + jsonTable.royalView.status + '\n' + jsonTable.royalView.tweet))
        } else {
          jsonTable.royalView.status = 'X closed'
          console.log('\n==========\n')
          console.log(chalk.red('\nRoyalview:\n' + jsonTable.royalView.status + '\n' + jsonTable.royalView.tweet))
        }
      }
      if (/erie\scanal/i.test(string) && jsonTable.OECR.bool) {
        jsonTable.OECR.tweet = string
        jsonTable.OECR.bool = false
        if (/open/i.test(string)) {
          jsonTable.OECR.status = 'O open'
          console.log('\n==========\n')
          console.log(chalk.green('\nOhio & Erie Canal:\n' + jsonTable.OECR.status + '\n' + jsonTable.OECR.tweet))
        } else {
          jsonTable.OECR.status = 'X closed'
          console.log('\n==========\n')
          console.log(chalk.red('\nOhio & Erie Canal:\n' + jsonTable.OECR.status + '\n' + jsonTable.OECR.tweet))
        }
      }
    }
    console.log('\n==========\n')
    var obj4 = dataStuffFour[0]
    var string4 = JSON.stringify(obj4.text)
    jsonTable.vulturesKnob.tweet = string4
    if (/open/i.test(string4)) {
      jsonTable.vulturesKnob.status = 'O open'
      console.log(chalk.green('\nVulture\'s Knob:\n' + jsonTable.vulturesKnob.status + '\n' + jsonTable.vulturesKnob.tweet))
    } else {
      jsonTable.vulturesKnob.status = 'X closed'
      console.log(chalk.red('\nVulture\'s Knob:\n' + jsonTable.vulturesKnob.status + '\n' + jsonTable.vulturesKnob.tweet))
    }
    console.log('\n==========\n')
    console.log(chalk.magenta('\nHAVE FUN GETTING HURT!'))
  }
])
