# robot42 - The toy robot other toy robots look up to
![''][logo]&nbsp;[![Coverage Status][coverall-badge]][coverall-link]&nbsp;[![Codacy Badge][codacy-badge]][codacy-link]

[Vik Ramanujam](https://vik.ramanuj.am)'s take on the toy robot.

Please have a look at [the test file](https://github.com/vviikk/robot42/blob/master/src/robot.test.js) to see assertions.

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
[coverall-link]: https://coveralls.io/github/piggyslasher/robot42?branch=master
[coverall-badge]: https://coveralls.io/repos/github/piggyslasher/robot42/badge.svg?branch=master&today
[codacy-badge]: https://api.codacy.com/project/badge/Grade/723898f5c960465eab5cf5988482e71a?isInternal=true
[codacy-link]: https://www.codacy.com/app/vviikk/robot42?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=piggyslasher/robot42&amp;utm_campaign=Badge_Grade
