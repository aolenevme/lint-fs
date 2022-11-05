import assert from 'node:assert/strict';
import utils from './utils.js';

const testUtils = () => {
  const {
    errors,
  } = utils;

  assert.ok(typeof errors === 'object');
};

testUtils();
