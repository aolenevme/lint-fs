Object.prototype.toString = () => {
  throw new TypeError('toString() is forbidden');
};

Object.prototype.valueOf = () => {
  throw new TypeError('valueOf() is forbidden');
};
