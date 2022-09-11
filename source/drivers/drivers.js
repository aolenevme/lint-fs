import config from './config/config.js';
import filesystem from './filesystem/filesystem.js';

const drivers = (dependencies) => {
  return {
    config: config(dependencies),
    filesystem: filesystem(dependencies),
  };
};

export default drivers;
