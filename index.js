let storedPhotos
var URL = window.webkitURL || window.URL;

document.addEventListener('DOMContentLoaded', function() {

  //testfunctionspace

  // Check file system for stringified array in localStorage and if one is not present, create an array, strinify it, and store it in localStorage
  checkLocalStorage()

  // var elems = document.querySelectorAll('.carousel');
  // let options = {
  //
  // }
  // var instances = M.Carousel.init(elems, options);
  // materialize initializations
  // M.AutoInit();
  let elems = document.querySelectorAll('.fixed-action-btn');
  let instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
  let elems2 = document.querySelectorAll('.tooltipped');
  let instances2 = M.Tooltip.init(elems2);

  let elems3 = document.querySelectorAll('.modal');
  let instances3 = M.Modal.init(elems3);

  if (storedPhotos.length > 0){
    let elems4 = document.querySelectorAll('.carousel');
    let instances4 = M.Carousel.init(elems4, {});
  }

  // event listeners
  let input = document.getElementById('upload_photo')
  input.addEventListener('change', handleFiles)
  // let upload = document.getElementById('upload_btn')
  // upload.addEventListener('change', handleFiles)
});

function handleFiles(e) {
  var ctx = document.getElementById('canvas').getContext('2d');
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();
  img.src = url;
  img.onload = function() {
    let tmp = [img.height, img.width]
    let dI = createConstraints(tmp, ctx)
    if (typeof dI == 'string') {
      // modal activation with image too small then return to kill the function
    } else {
      ctx.drawImage(img, dI.sx, dI.sy, dI.sWidth, dI.sHeight, dI.dx, dI.dy, dI.dWidth, dI.dHeight)
      document.getElementById('submitButton').hidden = false
    }
  }
}

function submitPhoto () {
  newPhoto()
  checkLocalStorage()
}

// function that sets the constraints to automatically crop and resize the original
function createConstraints(tmp, ctx) {
  let dI = {
    sx: 0,
    sy: 0,
    sWidth: 512,
    sHeight: 512,
    dx: 0,
    dy: 0,
    dWidth: 512,
    dHeight: 512
  }
  if (tmp[0] < 512 || tmp[1] < 512) {
    var instance = M.Modal.getInstance(elem)
    instance.open()
    return `Image resolution of ${tmp[1]}x${tmp[0]}px. Min-resolution is 512x512px.`
  } else if (tmp[0] == tmp[1]) {
    dI.sWidth = tmp[0]
    dI.sHeight = tmp[0]
    return dI
  } else {
    if (tmp[1] > tmp[0]) {
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
function checkLocalStorage() {
  storedPhotos = JSON.parse(localStorage.getItem('storedPhotos'))
  if (storedPhotos == null) {
    storedPhotos = []
  }
  if (storedPhotos[0] !== undefined) {
    let tmp = []
    for (let i = 0; i < storedPhotos.length; i++) {
      tmp.push(`data:image/png;base64,${LZString.decompress(storedPhotos[i])}`)
    }
    storedPhotos = tmp
    populateCarousel()
    updateProgress ()
  }
  return storedPhotos
}

// if onload, there are saved pictures, hide the guide text and input, show the carosel, and populate it with images
function populateCarousel() {
  // hide until carousel is ready
  unhideCarousel()
  let numArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
  let carouselDiv = document.getElementById('carouselDiv')
  carouselDiv.innerHTML = ""
  for (let i = 0; i < storedPhotos.length; i++){
    carouselDiv.innerHTML += `<a class="carousel-item" href="#${numArr[i]}!"><img src="${storedPhotos[i]}"></a>`
  }
}

// hide first view elements and unhide carousel element
function unhideCarousel() {
  let firstTimeViewer = document.getElementById('firstTimeViewer')
  firstTimeViewer.hidden = true
  let carousel = document.getElementById('carouselDiv')
  carousel.hidden = false
}
// function to return a parsed canvas img to link to carousel elements
// async function generateURLS() {
//   let result = []
//   let tmp
//   for (let i = 0; i < storedPhotos.length; i++) {
//     tmp = await LZString.decompress(storedPhotos[i])
//     result.push(tmp)
//   }
//   return result
// }

// function that compresses and stores new photos
// NOTE: perhaps update a "progress bar" to show how much space is left in localStorage
function newPhoto() {
  let img = document.getElementById('canvas').toDataURL()
  storedPhotos.push(img)
  storeData()
  return storedPhotos
}

function storeData () {
  let result = []
  for (let i=0; i < storedPhotos.length; i++){
    result.push(LZString.compress(storedPhotos[i].replace(/^data:image\/(png|jpg);base64,/, "")))
  }
  localStorage.setItem('storedPhotos', JSON.stringify(result))
}
//function to allow upload from toolbar

// function to set % on progressBar and total used in amountStored
function updateProgress () {
  let storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2)/1048576).toFixed(2)
  let percent = Math.floor(storageAmt/5*100)
  let progressBar = document.getElementById('progressBar')
  let amountStored = document.getElementById('amountStored')
  progressBar.style.width = `${percent}%`
  amountStored.innerText = `${storageAmt}MB`
  // console.log(`${storageAmt}MB @ ${percent}%`)
}
