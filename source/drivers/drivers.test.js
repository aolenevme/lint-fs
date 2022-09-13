import assert from 'node:assert/strict';
import drivers from './drivers.js';

const testDrivers = () => {
  const {
    config,
    filesystem,
    logger,
  } = drivers({});

  assert.deepEqual(typeof config, 'object');
  assert.deepEqual(typeof filesystem, 'object');
  assert.deepEqual(typeof logger, 'object');
};

testDrivers();
