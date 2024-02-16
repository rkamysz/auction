class Result {
  withContent(content) {
    return {
      content,
      error
    };
  };

  withError(error) {
    return {
      content,
      error
    };
  };
}

module.exports = Result;
