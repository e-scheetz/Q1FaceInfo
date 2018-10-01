let storedPhotos = []
let usrName
let current
const numObj = {
  'one': 0,
  'two': 1,
  'three': 2,
  'four': 3,
  'five': 4,
  'eight': 7,
  'eighteen': 17,
  'eighty': 79,
  'eighty-eight': 87,
  'eighty-five': 84,
  'eighty-four': 83,
  'eighty-nine': 88,
  'eighty-one': 80,
  'eighty-seven': 86,
  'eighty-six': 85,
  'eighty-three': 82,
  'eighty-two': 81,
  'eleven': 10,
  'fifteen': 14,
  'fifty': 49,
  'fifty-eight': 57,
  'fifty-five': 54,
  'fifty-four': 53,
  'fifty-nine': 58,
  'fifty-one': 50,
  'fifty-seven': 56,
  'fifty-six': 55,
  'fifty-three': 52,
  'fifty-two': 51,
  'five': 4,
  'forty': 39,
  'forty-eight': 47,
  'forty-five': 44,
  'forty-four': 43,
  'forty-nine': 48,
  'forty-one': 40,
  'forty-seven': 46,
  'forty-six': 45,
  'forty-three': 42,
  'forty-two': 41,
  'four': 3,
  'fourteen': 13,
  'nine': 8,
  'nineteen': 18,
  'ninety': 89,
  'ninety-eight': 97,
  'ninety-five': 94,
  'ninety-four': 93,
  'ninety-nine': 98,
  'ninety-one': 90,
  'ninety-seven': 96,
  'ninety-six': 95,
  'ninety-three': 92,
  'ninety-two': 91,
  'one': 0,
  'one-hundred': 99,
  'seven': 6,
  'seventeen': 16,
  'seventy': 69,
  'seventy-eight': 77,
  'seventy-five': 74,
  'seventy-four': 73,
  'seventy-nine': 78,
  'seventy-one': 70,
  'seventy-seven': 76,
  'seventy-six': 75,
  'seventy-three': 72,
  'seventy-two': 71,
  'six': 5,
  'sixteen': 15,
  'sixty': 59,
  'sixty-eight': 67,
  'sixty-five': 64,
  'sixty-four': 63,
  'sixty-nine': 68,
  'sixty-one': 60,
  'sixty-seven': 66,
  'sixty-six': 65,
  'sixty-three': 62,
  'sixty-two': 61,
  'ten': 9,
  'thirteen': 12,
  'thirty': 29,
  'thirty-eight': 37,
  'thirty-five': 34,
  'thirty-four': 33,
  'thirty-nine': 38,
  'thirty-one': 30,
  'thirty-seven': 36,
  'thirty-six': 35,
  'thirty-three': 32,
  'thirty-two': 31,
  'three': 2,
  'twelve': 11,
  'twenty': 19,
  'twenty-eight': 27,
  'twenty-five': 24,
  'twenty-four': 23,
  'twenty-nine': 28,
  'twenty-one': 20,
  'twenty-seven': 26,
  'twenty-six': 25,
  'twenty-three': 22,
  'twenty-two': 21,
  'two': 1
}
var URL = window.webkitURL || window.URL;

document.addEventListener('DOMContentLoaded', function() {

  //testfunctionspace

  // Check file system for stringified array in localStorage and if one is not present, create an array, strinify it, and store it in localStorage
  checkLocalStorage()
  loadUserData()

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

  // if (storedPhotos.length > 0) {
  //   let elems4 = document.querySelectorAll('.carousel');
  //   let instances4 = M.Carousel.init(elems4, {});
  // }

  // event listeners
  let input = document.getElementById('upload_photo')
  input.addEventListener('change', handleFiles)
  // code to add event listener
  // some code moved to lower functions
  // let upload = document.getElementById('upload_btn')
  // upload.addEventListener("click", setTimeout(remoteClick1, 500))

  // modified https://codepen.io/anon/pen/Lyvwoj
  if (storedPhotos.length > 0){
    $(".carousel").carousel({
      onCycleTo: function(slide) {
        current = slide.id
        current = current.slice(1, current.length - 1)
        return current
      }
    });
  }

  if (typeof storedPhotos[0] === 'undefined' && usrName.length === 0) {
    firstVisit()
  }
  bump()
});

function handleFiles(e){
  let length = e.target.files.length
  let ele = document.getElementById('modal2').children[0]
  for (let i = 1; i < length; i++){
    // write code to canvas area adding more canvases need dynamic id's = `canvas${i+1}`
    ele.innerHTML += `<canvas height="512" width="512" id="canvas${i+1}"/>`
  }
  for (let i = 0; i < length; i++){
    // write to canvases (will need to change HTML id canvas to canvas1)
    handleFiles2(e, i)
  }
}
function handleFiles2(e, i) {
  let ctx = document.getElementById(`canvas${i+1}`).getContext('2d');
  let url = URL.createObjectURL(e.target.files[i]);
  let img = new Image();
  img.src = url;
  img.onload = function() {
    let tmp = [img.height, img.width]
    let dI = createConstraints(tmp, ctx)
    if (typeof dI == 'string') {
      // modal activation with image too small then return to kill the function
    } else {
      let instance2 = M.Modal.getInstance(modal2)
      instance2.open()
      ctx.drawImage(img, dI.sx, dI.sy, dI.sWidth, dI.sHeight, dI.dx, dI.dy, dI.dWidth, dI.dHeight)
      // // NOTE: mp commmented out to keep submit button handy
      // document.getElementById('submitButton').hidden = false
    }
  }
}

function submitPhoto() {
  let ele = document.getElementById('modal2').children[0]
  newPhoto()
  ele.innerHTML = `<canvas height="512" width="512" id="canvas1"></canvas>`
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
    let instance = M.Modal.getInstance(modal1);
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
    localStorage.setItem('storedPhotos', JSON.stringify(storedPhotos))
    firstVisit()
  }
  if (storedPhotos[0] !== undefined) {
    let tmp = []
    for (let i = 0; i < storedPhotos.length; i++) {
      tmp.push(`data:image/png;base64,${LZString.decompress(storedPhotos[i])}`)
    }
    storedPhotos = tmp
    populateCarousel()
    updateProgress()
  }
  return storedPhotos
}

// if onload, there are saved pictures, hide the guide text and input, show the carosel, and populate it with images
function populateCarousel() {
  // hide until carousel is ready
  unhideCarousel()
  let tmp = {}
  let key
  for (key in numObj) {
    tmp[`${numObj[key]}`] = key
  }
  let carouselDiv = document.getElementById('carouselDiv')
  carouselDiv.innerHTML = ""
  for (let i = 0; i < storedPhotos.length; i++) {
    carouselDiv.innerHTML += `<a id="%${tmp[i]}%" class="carousel-item" href="#${tmp[i]}!"><img src="${storedPhotos[i]}"></a>`
  }
  if (storedPhotos.length > 0) {
    let elems4 = document.querySelectorAll('.carousel');
    let instances4 = M.Carousel.init(elems4, {});
  }
}

// hide first view elements and unhide carousel element
function unhideCarousel() {
  let firstTimeViewer = document.getElementById('firstTimeViewer')
  firstTimeViewer.hidden = true
  let carousel = document.getElementById('enCDiv')
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
  let storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2) / 1048576).toFixed(2)
  let percent = Math.floor(storageAmt / 5 * 100)
  if (percent >= 100){
    percent = 100
    closeModal2()
    bump()
  }else if (percent < 1){
    percent = 0
  }
  let i = 0
  let img = document.getElementById(`canvas${i+1}`)
  let dataURL
  while (document.getElementById(`canvas${i+1}`) && percent < 100){
    dataURL = img.toDataURL()
    storedPhotos.push(dataURL)
    i++
    img = document.getElementById(`canvas${i+1}`)
    storeData()
    storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2) / 1048576).toFixed(2)
    percent = Math.floor(storageAmt / 5 * 100)
    if (percent >= 100){
      percent = 100
      closeModal2()
      bump()
    }else if (percent < 1){
      percent = 0
    }
    if (percent === 100){
      let ele = document.getElementById('warnModal').children[0].children[0]
      ele.innerText = `Please be aware that you have used ${percent}% of all available space. One or more photos may not have been imported.`
      closeModal2()
      let instance = M.Modal.getInstance(warnModal)
      instance.open()
      return
    }
  }
  let ele = document.getElementById('modal2').children[0]
  ele.innerHTML = `<canvas height="512" width="512" id="canvas1"/>`
  return storedPhotos
  closeModal2()
}

function storeData() {
  let result = []
  for (let i = 0; i < storedPhotos.length; i++) {
    result.push(LZString.compress(storedPhotos[i].replace(/^data:image\/(png|jpg);base64,/, "")))
  }
  localStorage.setItem('storedPhotos', JSON.stringify(result))
  bump()
}
//function to allow upload from toolbar

// function to set % on progressBar and total used in amountStored
function updateProgress() {
  let storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2) / 1048576).toFixed(2)
  let percent = Math.floor(storageAmt / 5 * 100)
  let progressBar = document.getElementById('progressBar')
  let amountStored = document.getElementById('amountStored')
  if (parseInt(percent) < 1){
    progressBar.style.width = '0%'
    amountStored.innerText = '0MB'
  }else if (parseInt(percent) > 99){
    progressBar.style.width = '100%'
    amountStored.innerText = '5MB'
  }else{
    progressBar.style.width = `${percent}%`
    amountStored.innerText = `${storageAmt}MB`
  }
  // console.log(`${storageAmt}MB @ ${percent}%`)
}

// 12:24 :: KooiInc @ https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
// function eventFire(el, etype){
//   if (el.fireEvent) {
//     el.fireEvent('on' + etype);
//   } else {
//     var evObj = document.createEvent('Events');
//     evObj.initEvent(etype, true, false);
//     el.dispatchEvent(evObj);
//   }
//   console.log(el.fireEvent)
// }
// to trigger
// eventFire(document.getElementById('mytest1'), 'click');

// the theHollowPlace ... why? because it's a terrible funny idea but really I'm wondering if there needs to be a click event for the input in order for it to be tricked into being clicked
function theHollowPlace() {
  // BEHOLD! IT IS HOLLOW
}

// timeoutFunction
let timeout

function timeoutFunc(event) {
  timeout = setTimeout(remoteClick1, 500)
}
function timeoutFunc2(event) {
  timeout = setTimeout(theHollowPlace, 200)
}
// pushButton remote 1
function remoteClick1(event) {
  let storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2) / 1048576).toFixed(2)
  let percent = Math.floor(storageAmt / 5 * 100)
  if (percent >= 100){
    percent = 100
  }
  if (percent === 100){
    return
  }else{
    document.getElementById("upload_photo").click();
  }
  // Cancel the default action, if needed
  // event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
}

function remoteClick2(event) {
  // Cancel the default action, if needed
  // event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  document.getElementById("submitButton").click();
}

function saveUserInfo() {
  let usrName = document.getElementsByName('usrName')[0].value
  localStorage.setItem('usrName', `${usrName}`)
  let instance = M.Modal.getInstance(firstVisitModal)
  instance.close()
  loadUserData()
}

function loadUserData() {
  usrName = localStorage.getItem('usrName')
  if (typeof usrName !== 'string') {
    usrName = ""
  }
  let ele = document.getElementById('usrNameH4')
  if (usrName !== undefined) {
    ele.innerText = usrName
  }
  return usrName
}

async function firstVisit() {
  let instance = await M.Modal.getInstance(firstVisitModal)
  await instance.open()
}


function editUsrName() {
  let instance = M.Modal.getInstance(firstVisitModal)
  instance.open()
}

function openHelp() {
  let instance = M.Modal.getInstance(helpModal)
  instance.open()
}

function clearLocalStorage() {
  localStorage.setItem('storedPhotos', JSON.stringify([]))
  storedPhotos = []
  updateProgress()
  populateCarousel()
  let carousel = document.getElementById('enCDiv')
  carousel.hidden = true
  let viewer = document.getElementById('firstTimeViewer')
  viewer.hidden = false
  return storedPhotos
}

function closeModal2() {
  let instance = M.Modal.getInstance(modal2)
  instance.close()
  document.getElementById('upload_photo').value = ""
}

function deleteSingleImage() {
  let variable = document.getElementsByClassName('active')[1].children[0].src
  for (let i = 0; i < storedPhotos.length; i++) {
    if (variable === storedPhotos[i]) {
      storedPhotos.splice(i, 1)
    }
  }
  storeData()
  checkLocalStorage()
  let elems4 = document.querySelectorAll('.carousel');
  let instances4 = M.Carousel.init(elems4, {});
}

function bumpProgress(){
  let storageAmt = (((localStorage['storedPhotos'].length + storedPhotos.length) * 2) / 1048576).toFixed(2)
  let remote1 = document.getElementById('submitButton')
  let remote2 = document.getElementById('modal2').children[1].children[0].children[0].children[0]
  let percent = Math.floor(storageAmt / 5 * 100)
  if (percent > 100){
    percent = 100
  }
  let ele = document.getElementById('warnModal').children[0].children[0]
  if (percent === 100){
    ele.innerText = `Please be aware you have used all of the available space in localStorage. You may consider removing an older picture if you wish to add a new picture.`
    remote1.disabled = true
    remote2.disabled = true
      return false
  }else if (percent > 75){
    ele.innerText = `Please be aware you have used over 75% of localStorage. You are currently using ${percent}% of all available space.`
    remote1.disabled = false
    remote2.disabled = false
    return false
  }else{
    remote1.disabled = false
    remote2.disabled = false
    ele.innerText = ``
    return true
  }
}

function bump(){
  // let ele = document.getElementById('warnModal').children[0].children[0]
  let tmp = bumpProgress()
  if(tmp === false){
    let instance = M.Modal.getInstance(warnModal)
    instance.open()
  }
  return tmp
}

function clearAllLocalStorage() {
  localStorage.clear()
  let storedPhotos = []
  localStorage.setItem('storedPhotos', JSON.stringify(storedPhotos))
  bump()
  loadUserData()
  clearLocalStorage()
  firstVisit()
}
