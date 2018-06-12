import Robot from './robot'

/*
Example Input and Output
------------------------

### Example a
*/
const example1 = `
    PLACE 0,0,NORTH
    MOVE
    REPORT
`
/*
Expected output:

    0,1,NORTH

### Example b
*/
const example2 = `
    PLACE 0,0,NORTH
    LEFT
    REPORT
`
/*
Expected output:

    0,0,WEST

### Example c
*/
const example3 = `
    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT
`
/*
Expected output

    3,3,NORTH

*/

describe('Robot42 moves where it\'s told to move', () => {
  const robby = new Robot()
  it('should log out `0,1,NORTH` for example1', () => {
    spyOn(console, 'log')
    robby.do(example1)
    expect(console.log).toHaveBeenCalledWith('0,1,NORTH')
  })

  it('should log out `0,0,WEST` for example2', () => {
    spyOn(console, 'log')
    robby.do(example2)
    expect(console.log).toHaveBeenCalledWith('0,0,WEST')
  })

  it('should log out `3,3,NORTH` for example3', () => {
    spyOn(console, 'log')
    robby.do(example3)
    expect(console.log).toHaveBeenCalledWith('3,3,NORTH')
  })

  it('should log out `0,1,NORTH` for example3', () => {
    spyOn(console, 'log')
    robby.do(example3)
    robby.move()
    robby.move()
    // I am already at y = 5 so can't move further
    robby.move()
    robby.report()

    expect(console.log).toHaveBeenCalledWith('3,5,NORTH')
  })
})

describe('Robot42 should be a polite robot', () => {
  const robby = new Robot('', { debug: true })
  it('says hello when sayHi() is called', () => {
    spyOn(console, 'log')
    robby.sayHi()
    expect(console.log).toHaveBeenCalledWith('🤖 Hello, I\'m robot-42!\nᕕ( ՞ ᗜ ՞ )ᕗ')
  })
  it('logs everything to the console in debug mode', () => {
    robby.debug = true
    spyOn(console, 'log')
    const testLogs = ['asd', '123', { a: 'a' }]
    robby.log(testLogs)
    expect(console.log).toHaveBeenCalledWith(testLogs)
  })
  it('reports visually when told to', () => {
    robby.do(example3)
    spyOn(console, 'log')
    robby.report(true)
    expect(console.log).toHaveBeenCalledWith(['',
      '  12345 ',
      '  -----',
      '5|       ',
      '4|   ∧     I am at x: 3 and y: 3 facing NORTH',
      '3|       ',
      '2|       ',
      '1|       ',
      '',
    ].join('\n'))
  })

  it('logs nothing to the console when not in debug mode', () => {
    robby.debug = false
    spyOn(console, 'log')
    const testLogs = ['asd', '123', { a: 'a' }]
    robby.log(testLogs)
    expect(console.log).not.toHaveBeenCalledWith()
  })
})

describe('speaks english and understands degrees', () => {
  const robby = new Robot('RIGHT', { debug: false })
  it('tells me the orientation in degrees when given a string', () => {
    robby.debug = true
    spyOn(console, 'log')
    robby.turn('RIGHT')
    expect(console.log).toHaveBeenCalledWith(`↻ I turned RIGHT and am facing ${robby.legibleOrientation}`)
  })
})
