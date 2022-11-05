const error = {
  wrap (previous, next) {
    return [
      undefined,
      `${previous}: ${next}`,
    ];
  },
};

export default error;
