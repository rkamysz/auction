const updateObject = (source, partial) => {
  for (const key in partial) {
    if (partial[key] !== undefined) {
      source[key] = partial[key];
    }
  }
  return source;
};

module.export = { updateObject };