const errors = {
  wrap (current, previous) {
    return [
      undefined,
      `${current}: ${previous}`,
    ];
  },
};

export default errors;
