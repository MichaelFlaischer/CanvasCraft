'use strict'

function onInitGallery() {
  menuRender()
  renderGallery()
}

function renderGallery() {
  const gallery = document.querySelector('.gallery')
  const paintings = getSavedPaintings()

  paintings.forEach((painting) => {
    const imgElement = document.createElement('img')
    imgElement.src = painting.img
    imgElement.alt = painting.name
    imgElement.addEventListener('click', () => openDialog(painting))
    gallery.appendChild(imgElement)
  })
}

function openDialog(painting) {
  const dialog = document.querySelector('.dialog')
  dialog.querySelector('.dialog-img').src = painting.img
  dialog.querySelector('#paintingName').textContent = `Name: ${painting.name}`
  dialog.querySelector('#artistName').textContent = `Artist: ${painting.artist}`
  dialog.querySelector('#artistEmail').textContent = `Email: ${painting.email}`
  dialog.querySelector('#paintingType').textContent = `Type: ${painting.type}`
  dialog.querySelector('#paintingDate').textContent = `Date: ${painting.date}`
  dialog.querySelector('#paintingTime').textContent = `Time: ${painting.time}`

  dialog.style.display = 'flex'
}

function closeDialog() {
  const dialog = document.querySelector('.dialog')
  dialog.style.display = 'none'
}
