export default class Utils {
  /**
   *
   * @readonly
   * @static
   * @memberof Utils
   */
  static get config() {
    return {
      size: 5,
      legibleOrientations: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
      orientationsInDegrees: [0, 90, 180, 270],
    }
  }

  /**
   *
   * @static
   * @param {number} deg number of degrees I'm oriented frm North (0, 90, 180, 270)
   * @returns {String}
   * @memberof Utils
   */
  static getLegibleOrientation(deg) {
    return this.config.legibleOrientations[this.config.orientationsInDegrees.indexOf(deg)]
  }

  /**
   *
   * @static
   * @param {String} Human readable orientation ['NORTH', 'SOUTH'...]
   * @returns {Number} deg number of degrees I'm oriented frm North (0, 90, 180, 270)
   * @memberof Utils
   */
  static getOrientation(legibleOrientation) {
    return this
      .config.orientationsInDegrees[this.config.legibleOrientations.indexOf(legibleOrientation)]
  }

  /**
   *
   * @static
   * @param {String} whichWay
   * @param {Number} orientation in degrees
   * @returns {Number} the orientation current entity is facing, in degrees
   * @memberof Utils
   */
  static turn(whichWay, orientation) {
    const finalD = (
      whichWay === 'LEFT' ? // I check if i need to turn left
        -90 : 90 // If yes, I chek if I need to turn counter-clockwise, otherwise, clockwise
    ) + orientation // I turn

    // I always return a degree value less than 360, as 270 to a simple robot like me is equal to 630
    return (finalD + 360) % 360 // Modulos are perfect for this
  }

  /**
   *
   * @readonly
   * @static
   * @memberof Utils
   * @returns {Object} map of move functions
   */
  static get directionMap() {
    const checkValid = check => (check < (this.config.size + 1) &&
        (check > 0) && check) || false

    const move = moveBy => ({ x, y }) => ({
      x: checkValid(moveBy.x + x) || x,
      y: checkValid(moveBy.y + y) || y,
    })

    return {
      0: {
        move: move({ x: 0, y: 1 }),
      },
      90: {
        move: move({ x: 1, y: 0 }),
      },
      180: {
        move: move({ x: 0, y: -1 }),
      },
      270: {
        move: ({ x: -1, y: 0 }),
      },
    }
  }
}
