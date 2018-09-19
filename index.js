let storedPhotos
var URL = window.webkitURL || window.URL;

document.addEventListener('DOMContentLoaded', function() {

  //testfunctionspace

  // Check file system for stringified array in localStorage and if one is not present, create an array, strinify it, and store it in localStorage
  checkLocalStorage()


  // materialize initializations

  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
  var elems2 = document.querySelectorAll('.tooltipped');
  var instances2 = M.Tooltip.init(elems2);

  var elems3 = document.querySelectorAll('.modal');
  var instances3 = M.Modal.init(elems3);

  // event listeners
  let input = document.getElementById('upload_photo')
  input.addEventListener('change', handleFiles)
});

// function that grabs and writes the image to canvas
function handleFiles(e) {
    var ctx = document.getElementById('canvas').getContext('2d');
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
      let tmp = [img.height, img.width]
      let dI = createConstraints(tmp, ctx)
      if (typeof dI == 'string'){
        // modal activation with image too small then return to kill the function
        console.log(dI)
      } else {
        ctx.drawImage(img, dI.sx, dI.sy, dI.sWidth, dI.sHeight, dI.dx, dI.dy, dI.dWidth, dI.dHeight)
      }
      // ctx.drawImage(img, 0, 0, 512, 512)
    }
    img.src = url;
    newPhoto()
}

// function that sets the constraints to automatically crop and resize the original
function createConstraints(tmp, ctx){
  let dI = {sx: 0, sy: 0, sWidth: 512, sHeight: 512, dx: 0, dy: 0, dWidth: 512, dHeight: 512}
  if (tmp[0] < 512 || tmp[1] < 512){
    var instance = M.Modal.getInstance(elem)
    instance.open()
    return `Image resolution of ${tmp[1]}x${tmp[0]}px. Min-resolution is 512x512px.`
  } else if (tmp[0] == tmp[1]){
    dI.sWidth = tmp[0]
    dI.sHeight = tmp[0]
    return dI
  } else {
    if (tmp[1] > tmp[0]){
      // code for if the image is wider than it is tall
      dI.sx = parseInt((tmp[1] - tmp[0]) / 2)
      dI.sWidth = tmp[0]
      dI.sHeight = tmp[0]
    } else {
      // code for if the image is taller than it is wide
      dI.sy = parseInt((tmp[0] - tmp[1]) / 2)
      dI.sWidth = tmp[1]
      dI.sHeight = tmp[1]
    }
    return dI
  }
  return dI
}

// function that checks localStorage
async function checkLocalStorage(){
  storedPhotos = await JSON.parse(localStorage.getItem('storedPhotos'))
  if (storedPhotos == null){
    storedPhotos = []
  }
  if (storedPhotos[0] !== undefined){
    populateCarousel()
  }
  return storedPhotos
}

// if onload, there are saved pictures, hide the guide text and input, show the carosel, and populate it with images
async function populateCarousel(){
  // hide until carousel is ready
  // unhideCarousel()
  let carouselContents = await generateURLS()

}

// hide first view elements and unhide carousel element
function unhideCarousel(){
  let firstTimeViewer = document.getElementById('firstTimeViewer')
  firstTimeViewer.hidden = true
  let carousel = document.getElementById('carouselDiv')
  carousel.hidden = false
}
// function to return a parsed canvas img to link to carousel elements
async function generateURLS () {
  let result = []
  let tmp
  for (let i = 0; i < storedPhotos.length; i++){
    tmp = await LZString.decompress(storedPhotos[i])
    result.push(tmp)
  }
  return result
}

// function that compresses and stores new photos
// NOTE: perhaps update a "progress bar" to show how much space is left in localStorage
async function newPhoto(){
  let img = document.getElementById('canvas').toDataURL()
  let compressedImg = await LZString.compress(img)
  storedPhotos.push(compressedImg)
  localStorage.setItem('storedPhotos', JSON.stringify(storedPhotos))
  return storedPhotos
}
