import utils from './utils.js';
import assert from 'node:assert/strict';

const testUtils = () => {
  const {
    errors,
  } = utils;

  assert.ok(typeof errors === 'object');
};

testUtils();
