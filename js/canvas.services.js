var gElCanvas
var gCtx

let lastPos = null
let lastTime = null
let sizeShape = null
let drawing = false
let color = '#000'
let shape = 'circle'
let isPencil = false
let lastDrawTime = 0
const drawInterval = 40
var aSine

function onInitCanv() {
  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')

  gCtx.fillStyle = '#fdfdfd'
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

  document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value
  })

  document.getElementById('shapePicker').addEventListener('change', (e) => {
    shape = e.target.value
  })

  document.getElementById('pencilButton').addEventListener('click', () => {
    isPencil = !isPencil
  })

  gElCanvas.addEventListener('mousedown', startDrawing)
  gElCanvas.addEventListener('mouseup', stopDrawing)
  gElCanvas.addEventListener('mousemove', draw)
  gElCanvas.addEventListener('touchstart', startDrawing)
  gElCanvas.addEventListener('touchend', stopDrawing)
  gElCanvas.addEventListener('touchmove', draw)
}

function startDrawing(e) {
  drawing = true
  draw(e)
}

function stopDrawing() {
  drawing = false
  gCtx.beginPath()
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

  gCtx.lineWidth = isPencil ? 0.5 : 0.9
  gCtx.strokeStyle = color
  gCtx.fillStyle = color
  gCtx.lineCap = 'round'

  const pos = getMousePos(e)
  gCtx.save()
  gCtx.translate(pos.x, pos.y)
  gCtx.rotate((aSine * Math.PI) / 180)
  gCtx.translate(-pos.x, -pos.y)

  if (isPencil) {
    gCtx.lineTo(pos.x, pos.y)
    gCtx.stroke()
    gCtx.beginPath()
    gCtx.moveTo(pos.x, pos.y)
  } else {
    drawShape(pos.x, pos.y)
  }

  gCtx.restore()

  lastDrawTime = now
}

function drawShape(x, y) {
  if (shape === 'circle') {
    gCtx.beginPath()
    gCtx.arc(x, y, sizeShape, 0, Math.PI * 2)
    gCtx.stroke()
  } else if (shape === 'rectangle') {
    gCtx.strokeRect(x, y, sizeShape, sizeShape)
  } else if (shape === 'star') {
    drawStar(x, y, 5, sizeShape, sizeShape * 2)
  }
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2
  let x = cx
  let y = cy
  let step = Math.PI / spikes

  gCtx.beginPath()
  gCtx.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy - Math.sin(rot) * outerRadius
    gCtx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy - Math.sin(rot) * innerRadius
    gCtx.lineTo(x, y)
    rot += step
  }
  gCtx.lineTo(cx, cy - outerRadius)
  gCtx.closePath()
  gCtx.stroke()
}
