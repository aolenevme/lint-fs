import useCases from './useCases.js';
import assert from 'node:assert/strict';

const testUseCases = () => {
  const {
    lintFs,
  } = useCases({});

  assert.ok(typeof lintFs === 'function');
};

testUseCases();
