'use strict'

function menuRender() {
  const elNnav = document.querySelector('nav')
  elNnav.innerHTML = `
        <input type="checkbox" id="active" />
        <label for="active" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <div class="nav-container">
          <ul>
            <li><a href="main.html">Home</a></li>
            <li><a href="canvas.html">Canvas</a></li>
            <li><a href="gallery.html">Gallery</a></li>
          </ul>
        </div>
      `
}
