function prefixedEvent(element, type, callback) {
  var prefixes = ["webkit", "MS", "moz", "o", ""];
  for (var p = 0; p < prefixes.length; p++) {
    if (!prefixes[p]) type = type.toLowerCase();
    element.addEventListener(prefixes[p] + type, callback, false);
  }
}

module.exports = prefixedEvent;