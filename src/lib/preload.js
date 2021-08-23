export default function preloadImage(imageArray) {
  const images = [];
  for (var i = 0; i < imageArray.length; i++) {
    images[i] = new Image();
    images[i].src = imageArray[i].default;
  }
  return images;
}
