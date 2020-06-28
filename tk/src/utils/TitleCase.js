function TitleCaseModel(model) {
  let modelKeys = _.allKeys(model),
    modClone = _.clone(model),
    modUpCase = {};
  for (var key in modelKeys) {
    let keyUp = modelKeys[key].charAt(0).toUpperCase() + modelKeys[key].slice(1);
    let cloneVal = modClone[modelKeys[key]];
    modUpCase[keyUp] = cloneVal;
  }
  return modUpCase;
}

module.exports = TitleCaseModel;