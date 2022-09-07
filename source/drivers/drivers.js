import config from './config/config.js';

const drivers = (dependencies) => {
  return {
    config: config(dependencies),
  };
};

export default drivers;
