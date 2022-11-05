const errors = {
  wrap (previous, next) {
    return [
      undefined,
      `${previous}: ${next}`,
    ];
  },
};

export default errors;
