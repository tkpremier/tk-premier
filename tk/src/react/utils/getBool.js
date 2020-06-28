const getBoolean = (val) => {
  if (typeof val === 'string' && val.trim() === 'false') {
    return Boolean(false)
  };
  return Boolean(val);
}

export default getBoolean;
