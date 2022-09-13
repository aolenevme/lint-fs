const logger = ({
  std,
}) => {
  return {
    log: (text) => {
      std.log(text);
    },
  };
};

export default logger;
