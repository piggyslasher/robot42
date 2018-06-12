// Ignore contents of this file.
// Just wanted to play with it
import Robot42 from './robot'

const example2 = `
    PLACE 0,0,NORTH
    RIGHT
    MOVE
    REPORT
`
const robot42 = new Robot42(example2)

robot42.sayHi()
// robot42.move()
// robot42.report()
robot42.turn('LEFT')
robot42.report()
robot42.turn('RIGHT')
robot42.report()
robot42.move()
robot42.move()
robot42.turn('LEFT')
robot42.move()
robot42.move()
// robot42.turn('RIGHT')
// robot42.move()
robot42.report(true)

// console.log('I\'m done')
