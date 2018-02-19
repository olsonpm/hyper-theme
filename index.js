'use strict'

//---------//
// Imports //
//---------//

const fs = require('fs'),
  path = require('path')

//
//------//
// Init //
//------//

const myCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8'),
  colors = duplicateLightColors(getColors())

//
//------//
// Main //
//------//

exports.decorateConfig = config =>
  Object.assign({}, config, {
    backgroundColor: colors.black,
    fontFamily: `Hack, ${config.fontFamily}`,
    fontSize: 18,
    foregroundColor: colors.white,
    borderColor: '#222430',
    cursorColor: '#97979b',
    colors: Object.assign(colors, {
      lightBlack: '#878787',
      lightYellow: '#f5ff61',
    }),
    css: `${config.css}\n\n${myCss}\n`,
    shellArgs: [],
  })

//
//------------------//
// Helper Functions //
//------------------//

function duplicateLightColors(colors) {
  return Object.keys(colors).reduce((allColors, key) => {
    const lightKey = 'light' + upperFirst(key)

    return Object.assign(allColors, {
      [key]: colors[key],
      [lightKey]: colors[key],
    })
  }, {})
}

function upperFirst(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function getColors() {
  return {
    white: '#fff',
    black: '#131313',
    red: '#ff5c57',
    green: '#28ff6f',
    yellow: '#ad9039',
    blue: '#49adff',
    magenta: '#ff6ac1',
    cyan: '#45ffff',
  }
}
