var gElCanvas
var gCtx

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

  //   gElCanvas.addEventListener('mousedown', logMousePos)
}

let drawing = false
let color = '#000'
let shape = 'circle'
let isPencil = false

function startDrawing(e) {
  drawing = true
  draw(e)
}

function stopDrawing() {
  drawing = false
  gCtx.beginPath()
}

function draw(e) {
  e.preventDefault()

  if (!drawing) return

  gCtx.lineWidth = isPencil ? 1 : 3
  gCtx.strokeStyle = color
  gCtx.fillStyle = color
  gCtx.lineCap = 'round'

  const pos = getMousePos(e)
  if (isPencil) {
    gCtx.lineTo(pos.x, pos.y)
    gCtx.stroke()
    gCtx.beginPath()
    gCtx.moveTo(pos.x, pos.y)
  } else {
    drawShape(pos.x, pos.y)
  }
}

function getMousePos(e) {
  const rect = gElCanvas.getBoundingClientRect()

  const scaleX = gElCanvas.width / rect.width
  const scaleY = gElCanvas.height / rect.height

  return {
    x: (e.offsetX || e.touches[0].offsetX) * scaleX,
    y: (e.offsetY || e.touches[0].offsetY) * scaleY,
  }
}

function drawShape(x, y) {
  if (shape === 'circle') {
    gCtx.beginPath()
    gCtx.arc(x, y, 5, 0, Math.PI * 2)
    gCtx.fill()
  } else if (shape === 'rectangle') {
    gCtx.fillRect(x, y, 10, 10)
  } else if (shape === 'star') {
    drawStar(x, y, 5, 5, 10)
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
  gCtx.fill()
}

function logMousePos(e) {}
