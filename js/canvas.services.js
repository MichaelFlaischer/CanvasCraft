'use strict'

var gElCanvas
var gElCanv

var gCanvData = { color: '#000', shape: 'pencil', aSine: 1, insideFill: null, outsideFill: '#fdfdfd' }

let lastPos = null
let lastTime = null
let sizeShape = null
let drawing = false
let color = '#000'
let shape = 'pencil'
var aSine
let lastDrawTime = 0
const drawInterval = 40

function onInitCanv() {
  gElCanvas = document.querySelector('#canvas')
  gElCanv = gElCanvas.getContext('2d')

  console.log(gElCanvas)
  console.log(gElCanv)
  gElCanv.fillStyle = '#fdfdfd'
  gElCanv.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

  gElCanvas.addEventListener('mousedown', startDrawing)
  gElCanvas.addEventListener('mouseup', stopDrawing)
  gElCanvas.addEventListener('mousemove', draw)
  gElCanvas.addEventListener('touchstart', startDrawing)
  gElCanvas.addEventListener('touchend', stopDrawing)
  gElCanvas.addEventListener('touchmove', draw)
}

function clearCanvas() {
  gElCanv.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gElCanv.fillStyle = '#fdfdfd'
  gElCanv.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function changePicker() {
  shape = document.getElementById('shapePicker').value
}

function changeColor() {
  color = document.getElementById('colorPicker').value
}

function startDrawing(e) {
  drawing = true
  draw(e)
}

function stopDrawing() {
  drawing = false
  gElCanv.beginPath()
}

function getMousePos(e) {
  const rect = gElCanvas.getBoundingClientRect()

  const scaleX = gElCanvas.width / rect.width
  const scaleY = gElCanvas.height / rect.height

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

  if (lastPos && lastTime) {
    const dx = posX - lastPos.x
    const dy = posY - lastPos.y
    const dt = (now - lastTime) / 1000

    const distance = Math.sqrt(dx * dx + dy * dy)
    const speed = distance / dt

    const minSpeed = 0
    const maxSpeed = 1000
    const mappedSpeed = Math.min(Math.max(Math.round(((speed - minSpeed) / (maxSpeed - minSpeed)) * 15) + 1, 1), 16)

    var distY = posY - lastPos.y
    var distX = posX - lastPos.x

    aSine = Math.atan2(distY, distX) * (180 / Math.PI)

    lastPos = { x: posX, y: posY }
    lastTime = now

    return mappedSpeed
  }

  lastPos = { x: posX, y: posY }
  lastTime = now

  return 1
}

function draw(e) {
  e.preventDefault()
  const now = Date.now()

  if (now - lastDrawTime < drawInterval) {
    return
  }

  sizeShape = logMouseSpeed(e)
  if (!drawing) return

  gElCanv.lineWidth = shape === 'pencil' ? 0.5 : 0.9
  gElCanv.strokeStyle = color
  gElCanv.fillStyle = color
  gElCanv.lineCap = 'round'

  const pos = getMousePos(e)
  gElCanv.save()
  gElCanv.translate(pos.x, pos.y)
  gElCanv.rotate((aSine * Math.PI) / 180)
  gElCanv.translate(-pos.x, -pos.y)

  drawShape(pos.x, pos.y)

  gElCanv.restore()

  lastDrawTime = now
}
