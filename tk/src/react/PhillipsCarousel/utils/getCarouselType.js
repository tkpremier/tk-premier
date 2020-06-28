export default function (carouselTypeId = 1) {
  const types = [null, 'lot', 'maker'];
  return types[carouselTypeId] || null;
}
