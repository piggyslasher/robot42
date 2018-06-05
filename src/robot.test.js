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

  it('should log out `0,1,NORTH` for example3', () => {
    spyOn(console, 'log')
    robby.do(example3)
    expect(console.log).toHaveBeenCalledWith('3,3,NORTH')
  })
})
