Object.prototype.toString = () => {
  throw new Error('toString() is forbidden');
};

Object.prototype.valueOf = () => {
  throw new Error('valueOf() is forbidden');
};
