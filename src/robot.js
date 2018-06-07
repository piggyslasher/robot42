/* eslint-disable no-console */
import Utils from './utils'

const { name } = require('../package.json')

export default class Robot {
  constructor(commands, { debug = false } = {}) {
    this.commands = commands
    this.position = {
      x: 0,
      y: 0,
    }
    this.size = Utils.config.size
    this.orientation = 0
    this.debug = debug

    // I'm a polite robot
    this.debug && this.sayHi()
    this.parseCommands()
  }

  /**
   * I return the direction in which I am facing
   *
   * @readonly
   * @memberof Robot
   */
  get legibleOrientation() {
    return Utils.getLegibleOrientation(this.orientation)
  }

  /**
   * I say hello!
   *
   * @memberof Robot
   */
  sayHi() {
    console.log(`🤖 Hello, I'm ${name}!\nᕕ( ՞ ᗜ ՞ )ᕗ`)
  }

  // I'm just a utility function to log out my actions
  log() {
    if (this.debug) {
      console.log(...arguments)
    }
  }

  /**
   * Your wish is my command(s)
   *
   * @param {String} commands
   * @memberof Robot
   */
  do(commands) {
    this.commands = commands
    this.parseCommands()
  }

  parseCommands() {
    this.commands && this.commands.split('\n').map((line) => {
      const lineArray = line.trim().split(' ')
      switch (lineArray[0]) {
        case 'PLACE':
          this.place(...lineArray[1].split(','))
          return true
        case 'LEFT':
          this.turn('LEFT')
          break
        case 'RIGHT':
          this.turn('RIGHT')
          break
        case 'MOVE':
          this.move()
          break
        case 'REPORT':
          this.report()
          break
        default:
          return false
      }
    })
    return false
  }

  /**
   * I simple place myself where I'm told and face the direction you want me to
   *
   * @param {Number} position
   * @param {String} legibleOrientation
   * @memberof Robot
   */
  place(x, y, legibleOrientation) {
    this.position.x = Number(x)
    this.position.y = Number(y)
    this.orientation = Utils.getOrientation(legibleOrientation)
    this.log(`You placed me at ${x},${y},${legibleOrientation}`)
  }

  /**
   * I move myself 1 step in the direction I'm facing
   *
   * @memberof Robot
   */
  move() {
    this.position = Utils.directionMap[this.orientation].move(this.position)
    this.log(`↻ I moved and now at x: ${this.position.x} y: ${this.position.y}`)
  }

  /**
   * I turn to my left or right and face either `NORTH`, `SOUTH`, `EAST`, `WEST`
   *
   * @param {String} direction
   * @memberof Robot
   */
  turn(direction) {
    this.orientation = Utils.turn(direction, this.orientation)
    this.log(`↻ I turned ${direction} and am facing ${this.legibleOrientation}`)
  }

  /**
   * I report to base about my wherabouts in a complex grid
   * so that they can find me easily. 
   * NOTE: (pov from dev)
   *   I usually keep a bucket task which I work on when I need a break, distraction.
   *   This is it. Code isn't optimal for this function but I'd say it turned out alright.
   *   I know it's not in the requirements,
   *   but I've built a tic-tac-toe board before so re-using the code.
   * @memberof Robot
   */
  reportVisual() {
    // I'm a function and will return and arrow pointing
    // in the direction I'm facing
    const me = () =>
      // I am an array of arrows
      ['∧', '>', '∨', '<'][ // I'm detecting which arrow to choose base on
        Object.keys(Utils.directionMap) // the keys of my direction map: 0, 90, 180, 270
          .indexOf(`${this.orientation}`) // I have to interpolate, because keys in JS are always strings :)
      ]

    const space = ' '

    const output = [''] // I prepend a new line as I will join myself in the end

    output.push(`  ${[...Array(this.size)].map((item, index) => index + 1).join('')} `)
    output.push(`  ${[...Array(this.size + 1)].join('-')}`)

    // I don't want to use unshift because it's performance is bad, so reverse counting the array
    // would be much more awesome
    for (let y = this.size - 1; y >= 0; y--) {
      const line = [`${y+1}|`]

      for (let x = 0; x <= this.size + 1; x++) {
        if (x === this.position.x && y === this.position.y) {
          line.push(me())
        } else line.push(space)
        if (x === this.size + 1 && y === this.position.y) {
          line.push(`  I am at x: ${this.position.x} and y: ${this.position.y} facing ${this.legibleOrientation}`)
        }
      }

      output.push(line.join(''))
    }

    output.push('')

    return output.join('\n')
  }

  /**
   *
   * @param {boolean} visual
   * @memberof Robot
   */
  report(visual = false) {
    const report = (visual || this.debug) ? // I check if I need to report visually
      this.reportVisual() : // and report using a grid
      // I report in the format X,Y,ORIENTATION
      `${this.position.x},${this.position.y},${Utils.getLegibleOrientation(this.orientation)}`

    console.log(report)
    return report
  }
}
