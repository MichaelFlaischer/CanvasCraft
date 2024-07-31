'use strict'

function onInit() {
  menuRender()
  onInitCanv()
}

function downloadCanvas() {
  const canvas = document.getElementById('canvas')
  const dataURL = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataURL
  link.download = 'canvas_drawing.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function drawShape(x, y) {
  if (shape === 'pencil') {
    drawPencil(gElCanv, x, y)
  } else if (shape === 'circle') {
    drawCircle(gElCanv, x, y)
  } else if (shape === 'rectangle') {
    drawRectangle(gElCanv, x, y)
  } else if (shape === 'star') {
    drawStar(gElCanv, x, y, 5, sizeShape, sizeShape * 2)
  } else if (shape === 'triangle') {
    drawTriangle(gElCanv, x, y, sizeShape)
  } else if (shape === 'ellipse') {
    drawEllipse(gElCanv, x, y, sizeShape, sizeShape / 2)
  } else if (shape === 'heart') {
    drawHeart(gElCanv, x, y, sizeShape)
  } else if (shape === 'pentagon') {
    drawPentagon(gElCanv, x, y, sizeShape)
  } else if (shape === 'hexagon') {
    drawHexagon(gElCanv, x, y, sizeShape)
  } else if (shape === 'diamond') {
    drawDiamond(gElCanv, x, y, sizeShape)
  } else if (shape === 'octagon') {
    drawOctagon(gElCanv, x, y, sizeShape)
  } else if (shape === 'arrow') {
    drawArrow(gElCanv, x, y, sizeShape)
  } else if (shape === 'cloud') {
    drawCloud(gElCanv, x, y, sizeShape)
  }
}

function drawPencil(canv, x, y) {
  canv.lineTo(x, y)
  canv.stroke()
  canv.beginPath()
  canv.moveTo(x, y)
}
function drawCircle(canv, x, y) {
  canv.beginPath()
  canv.arc(x, y, sizeShape, 0, Math.PI * 2)
  canv.stroke()
}
function drawRectangle(canv, x, y) {
  canv.strokeRect(x, y, sizeShape, sizeShape)
}

function drawStar(canv, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2
  let x = cx
  let y = cy
  let step = Math.PI / spikes

  canv.beginPath()
  canv.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy - Math.sin(rot) * outerRadius
    canv.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy - Math.sin(rot) * innerRadius
    canv.lineTo(x, y)
    rot += step
  }
  canv.lineTo(cx, cy - outerRadius)
  canv.closePath()
  canv.stroke()
}

function drawTriangle(canv, x, y, size) {
  const height = (size * Math.sqrt(3)) / 2
  canv.beginPath()
  canv.moveTo(x, y - height / 2)
  canv.lineTo(x - size / 2, y + height / 2)
  canv.lineTo(x + size / 2, y + height / 2)
  canv.closePath()
  canv.stroke()
}

function drawEllipse(canv, x, y, rx, ry) {
  canv.beginPath()
  canv.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  canv.stroke()
}

function drawHeart(canv, x, y, size) {
  canv.beginPath()
  canv.moveTo(x, y)
  canv.bezierCurveTo(x, y - size / 2, x - size / 2, y - size / 2, x - size / 2, y)
  canv.bezierCurveTo(x - size / 2, y + size / 2, x, y + size / 2, x, y + size)
  canv.bezierCurveTo(x, y + size / 2, x + size / 2, y + size / 2, x + size / 2, y)
  canv.bezierCurveTo(x + size / 2, y - size / 2, x, y - size / 2, x, y)
  canv.closePath()
  canv.stroke()
}

function drawPentagon(canv, x, y, size) {
  const angle = (2 * Math.PI) / 5
  canv.beginPath()
  for (let i = 0; i < 5; i++) {
    canv.lineTo(x + size * Math.cos(angle * i), y + size * Math.sin(angle * i))
  }
  canv.closePath()
  canv.stroke()
}

function drawHexagon(canv, x, y, size) {
  const angle = (2 * Math.PI) / 6
  canv.beginPath()
  for (let i = 0; i < 6; i++) {
    canv.lineTo(x + size * Math.cos(angle * i), y + size * Math.sin(angle * i))
  }
  canv.closePath()
  canv.stroke()
}

function drawDiamond(canv, x, y, size) {
  canv.beginPath()
  canv.moveTo(x, y - size)
  canv.lineTo(x + size, y)
  canv.lineTo(x, y + size)
  canv.lineTo(x - size, y)
  canv.closePath()
  canv.stroke()
}

function drawHexagon(canv, x, y, size) {
  const angle = (2 * Math.PI) / 6
  canv.beginPath()
  for (let i = 0; i < 6; i++) {
    canv.lineTo(x + size * Math.cos(angle * i), y + size * Math.sin(angle * i))
  }
  canv.closePath()
  canv.stroke()
}

function drawOctagon(canv, x, y, size) {
  const angle = (2 * Math.PI) / 8
  canv.beginPath()
  for (let i = 0; i < 8; i++) {
    canv.lineTo(x + size * Math.cos(angle * i), y + size * Math.sin(angle * i))
  }
  canv.closePath()
  canv.stroke()
}

function drawArrow(canv, x, y, size) {
  canv.beginPath()
  canv.moveTo(x, y)
  canv.lineTo(x - size, y - size / 2)
  canv.lineTo(x - size, y - size / 4)
  canv.lineTo(x - size * 1.5, y - size / 4)
  canv.lineTo(x - size * 1.5, y + size / 4)
  canv.lineTo(x - size, y + size / 4)
  canv.lineTo(x - size, y + size / 2)
  canv.closePath()
  canv.stroke()
}

function drawCloud(canv, x, y, size) {
  canv.beginPath()
  canv.arc(x, y, size, Math.PI * 0.5, Math.PI * 1.5)
  canv.arc(x + size, y - size, size, Math.PI * 1, Math.PI * 1.85)
  canv.arc(x + size * 2, y - size, size, Math.PI * 1.15, Math.PI * 2)
  canv.arc(x + size * 3, y, size, Math.PI * 1.5, Math.PI * 0.5)
  canv.closePath()
  canv.stroke()
}
