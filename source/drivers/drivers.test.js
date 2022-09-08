import assert from 'node:assert/strict';
import drivers from './drivers.js';

const testDrivers = () => {
  const {
    config,
  } = drivers({});

  assert.deepEqual(typeof config, 'object');
};

testDrivers();
