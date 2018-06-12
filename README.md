# robot42 - The toy robot other toy robots look up to
![''][logo]&nbsp;[![Coverage Status](https://coveralls.io/repos/github/piggyslasher/robot42/badge.svg?branch=master)](https://coveralls.io/github/piggyslasher/robot42?branch=master)

[Vik Ramanujam](https://vik.ramanuj.am)'s take on the toy robot.

Please have a look at [the test file](https://github.com/piggyslasher/robot42/blob/master/src/robot.test.js) to see assertions.

I've moved out most logic into a Utils file so that you could apply the movement logic to pretty much anything like a car or a human.

To test, run:
```shell
npm i && npm test
```
or
```shell
yarn && yarn test
```

The robot can also be controlled after instantiated. You can play about with in in the run.js.

You can get make Robot42 do what you want it to:

```javascript
import Robot42 from './robot'

const example2 = `
    PLACE 0,0,NORTH
    RIGHT
    MOVE
    REPORT
`
const robot42 = new Robot42(example2)

// robot42 is not done yet

robot42.do(`
    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT
`)

robot42.report(true); // signifies that you want to see a visual output

/* 
  12345
  -----
5|
4|
3|   ∧     I am at x: 3 and y: 2 facing NORTH
2|
1|
*/
```

[logo]: https://api.travis-ci.org/piggyslasher/robot42.svg
