import assert from 'node:assert/strict';
import useCases from './useCases.js';

const testUseCases = () => {
  const {
    lintFs,
  } = useCases({});

  assert.ok(typeof lintFs === 'function');
};

testUseCases();
