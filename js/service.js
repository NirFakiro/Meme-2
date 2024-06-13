'use strict'

var elCanvas = document.querySelector('.canvas')
var gCtx = elCanvas.getContext('2d')

var gMeme = {
  selcetedImgId: 1,
  selcetedLineIdx: 1,
  lines: [
    {
      txt: 'I love meme',
      size: '20px sans-serif',
      color: 'red',
    },
  ],
}

function getMeme() {
  //render img//
  var img = new Image()
  img.src = gImg[0].url

  img.onload = function () {
    gCtx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)

    //render txt//
    var size = gMeme.lines[0].size
    var color = gMeme.lines[0].color
    var txt = gMeme.lines[0].txt

    gCtx.font = size
    gCtx.fillStyle = color

    gCtx.fillText(txt, 150, 70)
  }
}

function setLineTxt() {
  var userText = document.getElementById('textInput').value

  //MODAL//
  gMeme.lines[0].txt = userText
  gMeme.selcetedLineIdx = 1

  // CANVAS//

  gCtx.fillStyle = 'red'
  gCtx.font = '30px'
  gCtx.fillText(userText, 50, 100)
  renderMeme()
}

function setImg(url, id) {
  //MODAL//
  gMeme.selcetedImgId = id
  gImg[0].url = url

  //CANVAS//
  renderMeme()
  var elMemeContainer = document.querySelector('.meme-container')
  var elGallery = document.querySelector('.gallery')
  elMemeContainer.style.display = 'block'
  elGallery.style.display = 'none'
}

function getNewColor(color) {
  gMeme.lines[0].color = color
  renderMeme()
}
var count = gMeme.lines[0].size
function getNewSize() {
  var size = gMeme.lines[0].size
  count++
  size = count
  console.log('size:', size)
  renderMeme()
}

function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}
