'use strict'

var gImg = []

function renderGallery() {
  var elGallery = document.querySelector('.gallery')
  for (var i = 1; i < 19; i++) {
    gImg.push({ id: `${i}`, url: `img/${i}.jpg`, keywords: ['funny', 'cat'] })
  }
  var strHTML = ''
  gImg.forEach((img) => {
    strHTML += `<img onclick="onImgSelect('${img.url}' ,'${img.id}')" src="${img.url}" alt="Image ${img}" />`
  })

  elGallery.innerHTML = strHTML
}

function onImgSelect(url, id) {
  setImg(url, id)
  var elMemeContainer = document.querySelector('.meme-container')
  elMemeContainer.style.display = 'flex'
}
