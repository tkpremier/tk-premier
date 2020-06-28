function imgError(image, type) {
  var teamSrc = "/images/team_placeholder.png",
    itemSrc = "/images/item_placeholder.png";
  if (type === "team") {
    image.src = teamSrc;
  } else if (type ==="ios") {
    image.src = itemSrc;
  } else {
    image.src = itemSrc;
  }
  return true;
}

module.exports = imgError;