function createConstraints(img, ctx){
  let dI = {sx: 0, sy: 0, sWidth: 512, sHeight: 512, dx: 0, dy: 0, dWidth: 512, dHeight: 512}
  if (img.height < 512 || img.width < 512){
    var instance = M.Modal.getInstance(elem)
    instance.open()
    return `Image resolution of ${img.width}x${img.height}px. Min-resolution is 512x512px.`
  } else if (img.height == 512 || img.width == 512){
    drawConstrainedImage(dI, ctx)
  } else {
    if (img.width > img.height){
      // code for if the image is wider than it is tall
      results.sx = (img.width - img.height) / 2
    } else {
      // code for if the image is taller than it is wide
      results.sy = (img.height - img.width) / 2
    }
    drawConstrainedImage(dI, ctx)
  }
  return dI
}

function drawConstrainedImage(dI, ctx){
  ctx.drawImage(img, dI.sx, dI.sy, dI.sWidth, dI.sHeight, dI.dx, dI.dy, dI.dWidth, dI.dHeight)
}
