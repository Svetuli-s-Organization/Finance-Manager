Array.prototype.last = function() {
  if(this.length == 0) {
    return undefined;
  } else if(this.length == 1) {
    return this[0];
  } else {
    return this[this.length - 1];
  }
};
