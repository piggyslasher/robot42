// Humans are the greatest example of higher order
// functions, but here's my robot :)
                 // Let's use require and not import, till Node catches up proper
const { name } = require('./package.json');

class Utils {
  // I externalize the config
  static get config () {
    return {
      size: 5,
    }
  }

  /**
   *  I store the location in degrees so it's easy to rotate, hence i return
   *  legible human readable compass points when given a degree (0,90,180,270)
   *
   * @static
   * @param {number} deg
   * @returns {String}
   * @memberof Utils
   */
  static getLegibleOrientation(deg) {
    switch(deg){
      case 0:
        return 'NORTH'
      case 90:
        return 'EAST'
      case 180:
        return 'SOUTH'
      case 270:
        return 'WEST'
    }
  }

  /**
   *
   *
   * @static
   * @param {String} whichWay do I turn?
   * @param {Number} What is my current orientation in degrees?
   * @returns {Number} the orientation current entity is facing, after turning, in degrees
   * @memberof Utils
   */
  static turn(whichWay, orientation) {
    const finalD = (whichWay === 'LEFT' ? // I check if I need to go left
        - 90 : 90) + orientation // and I add or subtract 90 degrees from my current orientation
    
    return 
      (finalD + 360) // I avoid negative values while maintaining the same orientation
    % 360 // Yay, Modulo FTW, so I don't have values like 720 degrees
  }

  /**
   * I return an object that contains higher order fucntions that help me move.
   * I externalized this logic, so that in the future, you could use me
   * for a car, or even a human, and not just a robot.
   *
   * @readonly
   * @static
   * @memberof Utils
   * @returns {Object} map of move functions
   */
  static get directionMap() {
    const checkValid = (check, context) => {
      vlog(`Checking ${context} on ${check}`)
      return
        check < (this.config.size + 1) && // I check if I don't step off the grid (lol!)
        (check > 0) // or if I am told to go to a place that doesn't exist
        && check || false // I return the value I checked if valid, or false
    }

    const move = moveBy => ({ x, y }) => {
      const newPos = {
        x: checkValid(moveBy.x + x, 'x') || x,
        y: checkValid(moveBy.y + y, 'y') || y,
      }
      console.log(newPos);
      return newPos;
    }

    return {
      // I use numeric keys - perfectly safe, but will be
      // cast into strings by JS
      0: {
        move: move({ x: 0, y: 1})
      },
      90: {
        move: move({ x: 1, y: 0 }),
      },
      180: {
        move: move({x: 0, y: -1}),
      },
      270: {
        move: move({x: -1, y: 0}),
      }
    }
  }
  
  static verboseLog(){
    console.log(arguments)
  }
}

const vlog = Utils.verboseLog

class Robot42 {
  constructor (commands, { debug = false }) {
    this.commands = commands
    this.position = {
      x: 0,
      y: 0,
    }
    this.size = Utils.config.size;
    this.orientation = 0
    this.debug = debug;

    this.debug && this.sayHi()
  }

  /**
   * I return the direction in which I am facing
   *
   * @readonly
   * @memberof Robot42
   */
  get legibleOrientation() {
    return Utils.getLegibleOrientation(this.orientation);
  }

  /**
   * I say hello
   *
   * @memberof Robot42
   */
  sayHi() {
    console.log(`🤖 Hello, I'm ${name}!`)
  }
  
  /**
   * I move myself 1 step in the direction I'm facing
   *
   * @memberof Robot42
   */
  move() {
    debugger
    this.position = Utils.directionMap[this.orientation].move(this.position)
    if(this.debug) {
      console.log(`⇄ I moved and now at x: ${this.position.x} y: ${this.position.y}`)
    }
  }

  /**
   * I turn to my left or right and face either `NORTH`, `SOUTH`, `EAST`, `WEST`
   *
   * @param {String} direction
   * @memberof Robot42
   */
  turn(direction) {
    this.orientation = Utils.turn(direction, this.orientation)
    if(this.debug) {
      console.log(`↻ I turned ${direction} and am facing ${this.legibleOrientation}`)
    }
  }

  /**
   * I report to base about my wherabouts in a complex grid
   * so that they can find me easily
   * NOTE: (pov from dev)
   *   I usually keep a bucket task which I work on when I need a break, or a distraction.
   *   This is it. Code isn't optimal for this function but I'd say it turned out alright.
   * @memberof Robot42
   */
  reportVisual() {
    // I'm a function and will return and arrow pointing
    // in the direction I'm facing. I would ideally blong more in the Utils.
    const me = () =>
      ['∧','>','∨', '<'] // I am an array of arrows
      [ // I'm detecting which arrow to choose based on
        Object.keys(Utils.directionMap) // the keys of my direction map: 0, 90, 180, 270
          .indexOf(`${this.orientation}`) // I have to interpolate, because keys in JS are always strings :)
      ]

    const space = ' ';

    let output = ['']; // I prepend a new line as I will join myself in the end

    console.log(`  ${[...Array(this.size)].map((item, index) => index + 1).join('')} `)
    output.push(`  ${[...Array(this.size + 1)].join('-')}`)

    for (let y = this.size; y >= 0; y--) {
      const line = [`${y}|`];

      for (let x = 0; x <= this.size + 1; x++) {
        if (x === this.position.x && y === this.position.y) { line.push(me()) } else line.push(space)
        if (y === 0 && x === this.position.x) line.push(`  I am at x: ${this.position.x} and y: ${this.position.y} facing NORTH`)
      }

      output.push(line.join(''))
    }

    output.push('')

    console.log(output.join('\n'))
  }

  /**
   * I report my location and orientation
   *
   * @param {boolean} visual
   * @memberof Robot42
   */
  report(visual = false) {
    (visual || this.debug) // I check if I'm in debug mode or explicitly ask to be visual
      && this.reportVisual() || // and I report visually
      console.log(this.position.x, this.position.y, Utils.getLegibleOrientation(this.orientation)) // or I report with a simple message
  }
}

const robot42 = new Robot42('', { debug: true })

robot42.move()
robot42.report()
robot42.turn('LEFT')
robot42.report(true)
robot42.turn('RIGHT')
robot42.report(true)
robot42.move();
robot42.turn('RIGHT')
robot42.report(true)

console.log('I\'m done')
