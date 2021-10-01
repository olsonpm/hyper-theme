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

const decorateConfig = config =>
  Object.assign({}, config, {
    backgroundColor: colors.black,
    fontFamily: `Hack, ${config.fontFamily}`,
    fontSize: 14,
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

const decorateKeymaps = keymaps =>
  Object.assign({}, keymaps, {
    'ctrl-dir-scroll:scroll-line-up': 'ctrl+shift+alt+up',
    'ctrl-dir-scroll:scroll-line-down': 'ctrl+shift+alt+down',
    'editor:movePreviousWord': 'ctrl+left',
    'editor:moveNextWord': 'ctrl+right',
    'editor:moveBeginningLine': 'home',
    'editor:moveEndLine': 'end',
    'editor:deletePreviousWord': 'ctrl+backspace',
    'editor:deleteNextWord': 'ctrl+delete',
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
    yellow: '#ffda69',
    blue: '#49adff',
    magenta: '#ff6ac1',
    cyan: '#45ffff',
  }
}

//
//---------//
// Exports //
//---------//

module.exports = {
  decorateConfig,
  decorateKeymaps,
}
