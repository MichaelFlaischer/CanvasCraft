'use strict'

function onInit() {
  menuRender()
  onInitCanv()
}

function changeShapeSize() {
  const shapeSize = document.querySelector('.shape-size').value
  document.getElementById('shapeSizeValue').textContent = shapeSize
  updateData({ sizeShape: parseInt(shapeSize) }) // לוודא שהערך הוא מספר
}

function changeShapeWidth() {
  const shapeWidth = document.querySelector('.shape-width').value
  document.getElementById('shapeWidthValue').textContent = shapeWidth
  updateData({ lineWidth: parseInt(shapeWidth) })
}

function changeInnerColor() {
  const innerColor = document.querySelector('.inner-color').value
  updateData({ innerFill: innerColor })
}

function changeOutsideColor() {
  const outsideColor = document.querySelector('.outside-color').value
  updateData({ outsideFill: outsideColor })
}

function toggleContinuousPress() {
  const continuousPress = document.querySelector('.continuous-press').value
  updateData({ drawingSeq: continuousPress === 'true' })
}

function toggleFillShape() {
  const fillShape = document.querySelector('.fill-shape').value
  updateData({ drawInside: fillShape === 'true' })
}

function toggleShapeSizeSpeed() {
  const shapeSizeSpeed = document.querySelector('.shape-size-speed').value
  updateData({ shapeSizeBySpeed: shapeSizeSpeed === 'true' })
}

function changeDrawInterval() {
  const drawInterval = document.querySelector('.draw-interval').value
  updateData({ drawInterval: parseInt(drawInterval) })
}

function changePicker() {
  const shapePicker = document.getElementById('shapePicker').value
  updateData({ shape: shapePicker })
}

function updateSettings() {
  changeShapeSize()
  changeShapeWidth()
  changeInnerColor()
  changeOutsideColor()
  toggleContinuousPress()
  toggleFillShape()
  toggleShapeSizeSpeed()
  changeDrawInterval()
  changePicker()
}

function drawShape(canv, x, y, canvData) {
  if (canvData.shape === 'pencil') {
    drawPencil(canv, x, y)
  } else if (canvData.shape === 'circle') {
    drawCircle(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'rectangle') {
    drawRectangle(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'star') {
    drawStar(canv, x, y, 5, canvData.sizeShape, canvData.sizeShape * 2, canvData.drawInside)
  } else if (canvData.shape === 'triangle') {
    drawTriangle(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'ellipse') {
    drawEllipse(canv, x, y, canvData.sizeShape, canvData.sizeShape / 2, canvData.drawInside)
  } else if (canvData.shape === 'heart') {
    drawHeart(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'pentagon') {
    drawPentagon(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'hexagon') {
    drawHexagon(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'diamond') {
    drawDiamond(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'octagon') {
    drawOctagon(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'arrow') {
    drawArrow(canv, x, y, canvData.sizeShape, canvData.drawInside)
  } else if (canvData.shape === 'cloud') {
    drawCloud(canv, x, y, canvData.sizeShape, canvData.drawInside)
  }
}

function drawPencil(canv, x, y) {
  canv.lineTo(x, y)
  canv.stroke()
  canv.beginPath()
  canv.moveTo(x, y)
}

function drawCircle(canv, x, y, sizeShape, drawInside) {
  canv.beginPath()
  canv.arc(x, y, sizeShape, 0, Math.PI * 2)
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawRectangle(canv, x, y, sizeShape, drawInside) {
  if (drawInside) {
    canv.fillRect(x - sizeShape / 2, y - sizeShape / 2, sizeShape, sizeShape)
  }
  canv.strokeRect(x - sizeShape / 2, y - sizeShape / 2, sizeShape, sizeShape)
}

function drawStar(canv, cx, cy, spikes, outerRadius, innerRadius, drawInside) {
  let rot = (Math.PI / 2) * 3
  let x = cx
  let y = cy
  let step = Math.PI / spikes

  canv.beginPath()
  canv.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    canv.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    canv.lineTo(x, y)
    rot += step
  }
  canv.lineTo(cx, cy - outerRadius)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawTriangle(canv, x, y, size, drawInside) {
  const height = (size * Math.sqrt(3)) / 2
  canv.beginPath()
  canv.moveTo(x, y - height / 2)
  canv.lineTo(x - size / 2, y + height / 2)
  canv.lineTo(x + size / 2, y + height / 2)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawEllipse(canv, x, y, rx, ry, drawInside) {
  canv.beginPath()
  canv.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawHeart(canv, x, y, size, drawInside) {
  canv.beginPath()
  canv.moveTo(x, y)
  canv.bezierCurveTo(x, y - size / 2, x - size / 2, y - size / 2, x - size / 2, y)
  canv.bezierCurveTo(x - size / 2, y + size / 2, x, y + size / 2, x, y + size)
  canv.bezierCurveTo(x, y + size / 2, x + size / 2, y + size / 2, x + size / 2, y)
  canv.bezierCurveTo(x + size / 2, y - size / 2, x, y - size / 2, x, y)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawPentagon(canv, x, y, size, drawInside) {
  const angle = (2 * Math.PI) / 5
  canv.beginPath()
  for (let i = 0; i < 5; i++) {
    canv.lineTo(x + size * Math.cos(angle * i - Math.PI / 2), y + size * Math.sin(angle * i - Math.PI / 2))
  }
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawHexagon(canv, x, y, size, drawInside) {
  const angle = (2 * Math.PI) / 6
  canv.beginPath()
  for (let i = 0; i < 6; i++) {
    canv.lineTo(x + size * Math.cos(angle * i - Math.PI / 2), y + size * Math.sin(angle * i - Math.PI / 2))
  }
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawDiamond(canv, x, y, size, drawInside) {
  canv.beginPath()
  canv.moveTo(x, y - size)
  canv.lineTo(x + size, y)
  canv.lineTo(x, y + size)
  canv.lineTo(x - size, y)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawOctagon(canv, x, y, size, drawInside) {
  const angle = (2 * Math.PI) / 8
  canv.beginPath()
  for (let i = 0; i < 8; i++) {
    canv.lineTo(x + size * Math.cos(angle * i - Math.PI / 2), y + size * Math.sin(angle * i - Math.PI / 2))
  }
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawArrow(canv, x, y, size, drawInside) {
  canv.beginPath()
  canv.moveTo(x, y)
  canv.lineTo(x - size, y - size / 2)
  canv.lineTo(x - size, y - size / 4)
  canv.lineTo(x - size * 1.5, y - size / 4)
  canv.lineTo(x - size * 1.5, y + size / 4)
  canv.lineTo(x - size, y + size / 4)
  canv.lineTo(x - size, y + size / 2)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function drawCloud(canv, x, y, size, drawInside) {
  canv.beginPath()
  canv.arc(x, y, size, Math.PI * 0.5, Math.PI * 1.5)
  canv.arc(x + size, y - size, size, Math.PI * 1, Math.PI * 1.85)
  canv.arc(x + size * 2, y - size, size, Math.PI * 1.15, Math.PI * 2)
  canv.arc(x + size * 3, y, size, Math.PI * 1.5, Math.PI * 0.5)
  canv.closePath()
  if (drawInside) {
    canv.fill()
  }
  canv.stroke()
}

function downloadCanvas() {
  const canvas = document.querySelector('.canvas')
  const dataURL = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataURL
  link.download = 'canvas_drawing.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
