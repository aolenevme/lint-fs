const errors = {
  wrap (next, previous) {
    return [
      undefined,
      `${next}: ${previous}`,
    ];
  },
};

export default errors;
