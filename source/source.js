#!/usr/bin/env node
import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';

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
  _,
  error,
] = await useCases({
  config,
  filesystem,
  logger,
}).lintFs();
if (error) {
  fail(error);
}
