
module.exports = function getModelProp(model, key) {
  if (model instanceof Backbone.Model) {
    const attrs = model.attributes;
    const modelKey = _.findKey(attrs, (v, k) => { return k.toLowerCase() === key.toLowerCase() });
    if (_.isUndefined(modelKey)) {
      return null;
    } else {
      return model.get(modelKey);
    }

  } else {
    const modelKey = _.findKey(model, (v, k) => { return k.toLowerCase() === key.toLowerCase() });
    if (_.isUndefined(modelKey)) {
      return null
    } else {
      return model[modelKey];

    }
  }
}
