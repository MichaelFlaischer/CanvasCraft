'use strict'

function getAngle(x1, y1, x2, y2) {
  var distY = Math.abs(y2 - y1)
  var distX = Math.abs(x2 - x1)
  var dist = Math.sqrt(distY * distY + distX * distX)
  var val = distY / dist
  var aSine = Math.asin(val)
  return aSine
}
