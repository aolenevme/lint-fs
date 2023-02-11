#!/usr/bin/env node
import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';
import yaml from 'js-yaml';
import fs from 'node:fs/promises';

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
