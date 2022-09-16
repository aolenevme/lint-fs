import config from './config/config.js';
import fail from './fail/fail.js';
import filesystem from './filesystem/filesystem.js';
import logger from './logger/logger.js';

const drivers = (dependencies) => {
  return {
    config: config(dependencies),
    fail,
    filesystem: filesystem(dependencies),
    logger: logger(dependencies),
  };
};

export default drivers;
