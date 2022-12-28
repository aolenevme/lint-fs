import assert from 'node:assert/strict';
import './core.js';

const testCore = () => {
  assert.throws(
    () => {
      return `${{}}`;
    },
    {
      message: 'toString() is forbidden',
      name: 'TypeError',
    },
  );
  assert.throws(
    () => {
      return {} + 1;
    },
    {
      message: 'valueOf() is forbidden',
      name: 'TypeError',
    },
  );
};

testCore();
