import Utils from './utils'

describe('Utils returns the correct legible orientation when passed degrees', () => {
  it('should return \'NORTH\' when 0 deg', () => {
    expect(Utils.getLegibleOrientation(0)).toEqual('NORTH')
  })

  it('should return \'SOUTH\' when 180 deg', () => {
    expect(Utils.getLegibleOrientation(180)).toEqual('SOUTH')
  })

  it('should return \'EAST\' when 90 deg', () => {
    expect(Utils.getLegibleOrientation(90)).toEqual('EAST')
  })

  it('should return \'west\' when 270 deg', () => {
    expect(Utils.getLegibleOrientation(270)).toEqual('WEST')
  })
})

describe('Utils should turn me in the direction I face by 90 degrees', () => {
  const currentOriantation = 0
  it('returns the correct orientation after I turn', () => {
    expect(Utils.turn('LEFT', currentOriantation)).toEqual(270)
    expect(Utils.turn('RIGHT', currentOriantation)).toEqual(90)
    let newOrientation = Utils.turn('RIGHT', currentOriantation)
    newOrientation = Utils.turn('RIGHT', newOrientation)
    expect(newOrientation).toEqual(180)
  })
})

describe('Utils returns the correct diretionMap', () => {
  it('returns the correct direction map keys (0, 90, 180,270)', () => {
    // I keep the test dumb so I don't need to write tests for my tests
    expect(JSON.stringify({ test: Object.keys(Utils.directionMap) })).toEqual('{"test":["0","90","180","270"]}')
  })
})

describe('Utils steers me in the right direction', () => {
  let position = { x: 0, y: 0 }
  position = Utils.directionMap[0].move(position)
  expect(position).toEqual({ x: 0, y: 1 })
})
