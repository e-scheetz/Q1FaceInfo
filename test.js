let letterPool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let storedPhotos

function addPhoto () {
  getLocalStorage()
  let newPhoto = getImageData()
  let i = 0
  while (`storedPhotos${letterPool[i]}` !== undefined){
    if (`storedPhotos${letterPool[i+1]}` === undefined){
      `storedPhotos${letterPool[i+1]}` = newPhoto
    }
  }
  writeToLocalStorage()
}

function getImageData () {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let imageData = ctx.getImageData(0,0,512,512)
  return imageData
}

function writeToLocalStorage () {

}


function getLocalStorage () {

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
function writeToCarousel(){
  let numArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
  let carouselDiv = document.getElementById('carouselDiv')
  carouselDiv.innerHTML = ""
  for (let i = 0; i < storedPhotos.length){
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
function storeData () {
  let result = []
  for (let i=0; i < storedPhotos.length; i++){
    result.push(LZString.compress(storedPhotos[i].replace(/^data:image\/(png|jpg);base64,/, "")))
  }
  localStorage.setItem('storedPhotos', JSON.stringify(result))
}
