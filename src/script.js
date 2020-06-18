var fgimage = null;
var bgimage = null;
var background = document.getElementById("binput");
var foreground = document.getElementById("finput");
var fgCanvas = document.getElementById("can");
var bgCanvas = document.getElementById("can2");
var resCanvas = document.getElementById("can3");

function uploadForeground() {
  var fileName = foreground.value;
  alert("Chose " + fileName);
  fgimage = new SimpleImage(foreground);
  fgimage.drawTo(fgCanvas);
}

function uploadBackground() {
  var fileName = background.value;
  alert("Chose " + fileName);
  bgimage = new SimpleImage(background);
  bgimage.drawTo(bgCanvas);
}

// Steganography

function clearbits(pxval) {
  var x = Math.floor(pxval / 16) * 16;
  return x;
}

function chop2hide(image) {
  for (var pixel of image.values()) {
    pixel.setRed(clearbits(pixel.getRed()));
    pixel.setGreen(clearbits(pixel.getGreen()));
    pixel.setBlue(clearbits(pixel.getBlue()));
  }
  return image;
}

function shiftbits(pxval) {
  var x = Math.floor(pxval / 16);
  return x;
}

function shift(image) {
  for (var pixel of image.values()) {
    pixel.setRed(shiftbits(pixel.getRed()));
    pixel.setGreen(shiftbits(pixel.getGreen()));
    pixel.setBlue(shiftbits(pixel.getBlue()));
  }
  return image;
}

function combine(imageShow, imageHide) {
  for (var px of imageShow.values()) {
    hpx = imageHide.getPixel(px.getX(), px.getY());
    px.setRed(hpx.getRed() + px.getRed());
    px.setGreen(hpx.getRed() + px.getGreen());
    px.setBlue(hpx.getRed() + px.getBlue());
  }
  return imageShow;
}

function crop(newImage) {
  var h = 300;
  return newImage;
}

function crop(image, height, width) {
  var newImage = new SimpleImage(height, width);
  for (var px of newImage.values()) {
    var hpx = image.getPixel(px.getX(), px.getY());
    px.setRed(hpx.getRed());
    px.setGreen(hpx.getGreen());
    px.setBlue(hpx.getBlue());
  }
  return newImage;
}

function createComposite() {
  if (fgimage === null || !fgimage.complete) {
    alert("Foreground not loaded");
    doClear(can);
    return;
  }
  if (bgimage === null || !bgimage.complete) {
    alert("Background not loaded");
    doClear(can2);
    return;
  }

  var start = crop(fgimage, 300, 300);
  var hide = crop(bgimage, 300, 300);
  var output = start;
  start = chop2hide(start);
  hide = shift(hide);
  output = combine(start, hide);
  output.drawTo(resCanvas);
}

function clearCanvas() {
  doClear(can);
  doClear(can2);
  doClear(can3);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
