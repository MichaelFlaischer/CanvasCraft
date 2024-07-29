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
