import assert from 'node:assert/strict';
import drivers from './drivers.js';

const testDrivers = () => {
  const {
    config,
    filesystem,
  } = drivers({});

  assert.deepEqual(typeof config, 'object');
  assert.deepEqual(typeof filesystem, 'object');
};

testDrivers();
