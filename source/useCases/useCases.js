import lintFs from './lintFs/lintFs.js';

const useCases = (drivers) => {
  return {
    lintFs: lintFs(drivers),
  };
};

export default useCases;
