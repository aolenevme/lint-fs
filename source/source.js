#!/usr/bin/env node
import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';

const {
  config,
  filesystem,
  logger,
} = drivers({
  fs,
  std: console,
  yaml,
});

const [
  {
    correct,
    incorrect,
  },
  lintFsError,
] = await useCases({
  config,
  filesystem,
}).lintFs();

if (lintFsError) {
  throw new Error(lintFsError);
}

// 1. Окрасить в цвет
logger.logBatch(correct);
logger.logBatch(incorrect);
