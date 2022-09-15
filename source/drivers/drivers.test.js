import assert from 'node:assert/strict';
import drivers from './drivers.js';

const testDrivers = () => {
  const {
    config,
    fail,
    filesystem,
    logger,
  } = drivers({});

  assert.deepEqual(typeof config, 'object');
  assert.deepEqual(typeof fail, 'function');
  assert.deepEqual(typeof filesystem, 'object');
  assert.deepEqual(typeof logger, 'object');
};

testDrivers();
