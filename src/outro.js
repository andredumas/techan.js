  if (typeof define === "function" && define.amd) {
    define(techan);
  } else if (typeof module === "object" && module.exports) {
    module.exports = techan;
  } else {
    this.techan = techan;
  }
})(d3);