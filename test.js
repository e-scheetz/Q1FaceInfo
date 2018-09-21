/*this is a test area for either past iterations of attempts at functionality or current ones. Additionally, I think I'll keep some notes in this area up at the top*/
/*
12:08 -- working to implement upload functionality to a floating i tag submitButton

*/

let letterPool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let storedPhotos

function addPhoto() {
  getLocalStorage()
  let newPhoto = getImageData()
  let i = 0
  while (`storedPhotos${letterPool[i]}` !== undefined) {
    if (`storedPhotos${letterPool[i+1]}` === undefined) {
      `storedPhotos${letterPool[i+1]}` = newPhoto
    }
  }
  writeToLocalStorage()
}

function getImageData() {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let imageData = ctx.getImageData(0, 0, 512, 512)
  return imageData
}

function writeToLocalStorage() {

}


function getLocalStorage() {

}




//https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

let img = localStorage.getItem('a')
let decompressedPhoto = 'data:image/png;base64,' + LZString.decompress(img)
let tmpOutput = document.getElementById('tmpOutput')
tmpOutput.innerHTML += `<img src='${decompressedPhoto}'>`


// write to carousel
function writeToCarousel() {
  let numArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
  let carouselDiv = document.getElementById('carouselDiv')
  carouselDiv.innerHTML = ""
  for (let i = 0; i < storedPhotos.length) {
    carouselDiv.innerHTML += `<a class="carousel-item" href="#${numArr[i]}!"><img src="${storedPhotos[i]}"></a>`
  }
}


// <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>


let _lsTotal = 0
let _xLen
let _x
for (_x in localStorage) {
  _xLen = ((localStorage[_x].length + _x.length) * 2)
  _lsTotal += _xLen
  console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
}
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB")



//

// separate function to store to localStorage
function storeData() {
  let result = []
  for (let i = 0; i < storedPhotos.length; i++) {
    result.push(LZString.compress(storedPhotos[i].replace(/^data:image\/(png|jpg);base64,/, "")))
  }
  localStorage.setItem('storedPhotos', JSON.stringify(result))
}

// 12:24 :: KooiInc @ https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
// to trigger
// eventFire(document.getElementById('mytest1'), 'click');


// 12:45 :: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Get the input field
let upload = document.getElementById("upload_btn");

// Execute a function when the user releases a key on the keyboard
upload.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});
//

//
// anonymous function to close modal2
function() {
  let instance = M.Modal.getInstance(modal2)
  instance.close()
}
//refactored
function() {
  let instance = M.Modal.getInstance(modal2);
  instance.close();
}
// scrapped.

// regret and sadness
let tmp = 'One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen Twenty Twenty-one Twenty-two Twenty-three Twenty-four Twenty-five Twenty-six Twenty-seven Twenty-eight Twenty-nine Thirty Thirty-one Thirty-two Thirty-three Thirty-four Thirty-five Thirty-six Thirty-seven Thirty-eight Thirty-nine Forty Forty-one Forty-two Forty-three Forty-four Forty-five Forty-six Forty-seven Forty-eight Forty-nine Fifty Fifty-one Fifty-two Fifty-three Fifty-four Fifty-five Fifty-six Fifty-seven Fifty-eight Fifty-nine Sixty Sixty-one Sixty-two Sixty-three Sixty-four Sixty-five Sixty-six Sixty-seven Sixty-eight Sixty-nine Seventy Seventy-one Seventy-two Seventy-three Seventy-four Seventy-five Seventy-six Seventy-seven Seventy-eight Seventy-nine Eighty Eighty-one Eighty-two Eighty-three Eighty-four Eighty-five Eighty-six Eighty-seven Eighty-eight Eighty-nine Ninety Ninety-one Ninety-two Ninety-three Ninety-four Ninety-five Ninety-six Ninety-seven Ninety-eight Ninety-nine One-hundred'
let tmp2 = tmp.toLocaleLowerCase()
let arr = tmp2.split(" ")
let numObj = {}
for (let i = 0; i < arr.length; i++) {
  numObj[`${arr[i]}`] = i
}
numObj = {
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

// hold onto this for a sec would you?
result.push(LZString.compress(storedPhotos[i].replace(/^data:image\/(png|jpg);base64,/, "")))

// regex to grab stuff
function regexStuff() {
  let regex = /([a-z-]*)/g
  let tmp
  while ((tmp = regex.exec(bigString)) !== null) {
    tmp = `"${tmp}"`
    bigString.replace(regex, tmp)
  }
}

function count(str, regex) {
  return ((bigString || '').match(regex) || []).length
}

//morestuff
let current
$(".carousel").carousel({
  onCycleTo: function(slide) {
    current = slide[0].hash
    current = current.slice(1, current.length - 1)
    console.log(current)
    return current
  }
});

$(".carousel").carousel({onCycleTo: function(slide) {current = slide[0].hash; current = current.slice(1, current.length - 1); return current}});


// deleteSingleImage
function deleteSingleImage(){
  let variable = document.getElementById(`%${current}%`).href
  let tmp
  for (let i = 0; i < storedPhotos.length; i++){
    if (variable === storedPhotos[i]){
      console.log(storedPhotos.splice(i, 1), storedPhotos)
      // tmp = storedPhotos.splice(i, 1)
    }
  }
}

// cleaning handleFiles

function handleFiles(e) {
  let ctx = document.getElementById('canvas').getContext('2d');
  let url = URL.createObjectURL(e.target.files[0]);
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
