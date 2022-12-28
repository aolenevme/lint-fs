#!/usr/bin/env node
import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';
import './utils/core/core.js';

const {
  config,
  fail,
  filesystem,
  logger,
} = drivers({
  fs,
  std: console,
  yaml,
});

const [
  , error,
] = await useCases({
  config,
  filesystem,
  logger,
}).lintFs();
if (error) {
  fail(error);
}
