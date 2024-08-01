'use strict'

var gCanvData = {
  canvas: null,
  elCanvas: null,
  shape: null,
  sizeShape: null,
  lineWidth: null,
  aSine: 1,
  innerFill: null,
  outsideFill: null,
}
var gWebData = {
  lastPos: null,
  lastTime: null,
  lastDrawTime: 0,
  drawingSeq: false,
  shapeSizeBySpeed: false,
  mouseClicked: false,
  drawInterval: 40,
  drawInside: false,
}

function onInitCanv() {
  updateSettings()

  gCanvData.elCanvas = document.querySelector('.canvas')
  gCanvData.canvas = gCanvData.elCanvas.getContext('2d')

  clearCanvas()
  addEventListeners()
}

function updateData(data) {
  gCanvData = { ...gCanvData, ...data }
  gWebData = { ...gWebData, ...data }
}

function addEventListeners() {
  gCanvData.elCanvas.addEventListener('mousedown', startDrawing)
  gCanvData.elCanvas.addEventListener('mouseup', stopDrawing)
  gCanvData.elCanvas.addEventListener('mousemove', drawOnMove)
  gCanvData.elCanvas.addEventListener('touchstart', startDrawing)
  gCanvData.elCanvas.addEventListener('touchend', stopDrawing)
  gCanvData.elCanvas.addEventListener('touchmove', drawOnMove)
}

function clearCanvas() {
  gCanvData.canvas.clearRect(0, 0, gCanvData.elCanvas.width, gCanvData.elCanvas.height)
  gCanvData.canvas.fillStyle = getBGColor()
  gCanvData.canvas.fillRect(0, 0, gCanvData.elCanvas.width, gCanvData.elCanvas.height)
}

function startDrawing(e) {
  if (gWebData.drawingSeq) {
    gWebData.mouseClicked = true
    drawOnMove(e)
  } else drawSingle(e)
}

function stopDrawing() {
  gWebData.mouseClicked = false
  gCanvData.canvas.beginPath()
}

function drawSingle(e) {
  updateSettings()

  const pos = getMousePos(e)

  gCanvData.canvas.fillStyle = gCanvData.innerFill
  gCanvData.canvas.lineWidth = gCanvData.lineWidth
  gCanvData.canvas.strokeStyle = gCanvData.outsideFill
  gCanvData.canvas.lineCap = 'round'

  gCanvData.canvas.save()
  gCanvData.canvas.translate(pos.x, pos.y)
  gCanvData.canvas.rotate((gCanvData.aSine * Math.PI) / 180)
  gCanvData.canvas.translate(-pos.x, -pos.y)

  drawShape(gCanvData.canvas, pos.x, pos.y, gCanvData)

  gCanvData.canvas.restore()
}

function drawOnMove(e) {
  e.preventDefault()
  if (!gWebData.drawingSeq || !gWebData.mouseClicked) return

  const now = Date.now()
  if (now - gWebData.lastDrawTime < gWebData.drawInterval) {
    return
  }

  if (gWebData.shapeSizeBySpeed) {
    gCanvData.sizeShape = logMouseSpeed(e)
    gCanvData.canvas.lineWidth = gCanvData.sizeShape / 2
  } else {
    gCanvData.canvas.lineWidth = gCanvData.lineWidth
  }
  gCanvData.canvas.fillStyle = gCanvData.innerFill
  gCanvData.canvas.strokeStyle = gCanvData.outsideFill
  gCanvData.canvas.lineCap = 'round'

  const pos = getMousePos(e)
  gCanvData.canvas.save()
  gCanvData.canvas.translate(pos.x, pos.y)
  gCanvData.canvas.rotate((gCanvData.aSine * Math.PI) / 180)
  gCanvData.canvas.translate(-pos.x, -pos.y)

  drawShape(gCanvData.canvas, pos.x, pos.y, gCanvData)

  gCanvData.canvas.restore()

  gWebData.lastDrawTime = now
}

function getMousePos(e) {
  const rect = gCanvData.elCanvas.getBoundingClientRect()

  const scaleX = gCanvData.elCanvas.width / rect.width
  const scaleY = gCanvData.elCanvas.height / rect.height

  if (e.touches) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    }
  } else {
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }
}

function logMouseSpeed(e) {
  let posX
  let posY

  if (e.touches) {
    posX = e.touches[0].clientX
    posY = e.touches[0].clientY
  } else {
    posX = e.clientX
    posY = e.clientY
  }
  const now = performance.now()

  if (gWebData.lastPos && gWebData.lastTime) {
    const dx = posX - gWebData.lastPos.x
    const dy = posY - gWebData.lastPos.y
    const dt = (now - gWebData.lastTime) / 1000

    const distance = Math.sqrt(dx * dx + dy * dy)
    const speed = distance / dt

    const minSpeed = 0
    const maxSpeed = 1000
    const mappedSpeed = Math.min(Math.max(Math.round(((speed - minSpeed) / (maxSpeed - minSpeed)) * 15) + 1, 1), 16)

    var distY = posY - gWebData.lastPos.y
    var distX = posX - gWebData.lastPos.x

    gCanvData.aSine = Math.atan2(distY, distX) * (180 / Math.PI)

    gWebData.lastPos = { x: posX, y: posY }
    gWebData.lastTime = now

    return mappedSpeed
  }

  gWebData.lastPos = { x: posX, y: posY }
  gWebData.lastTime = now

  return 1
}
