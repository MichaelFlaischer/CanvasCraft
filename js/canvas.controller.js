'use strict'

function onInit() {
  menuRender()
  onInitCanv()
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.fillStyle = '#fdfdfd'
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
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
