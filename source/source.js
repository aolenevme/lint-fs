#!/usr/bin/env node
import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';

await useCases(drivers({
  fs,
  std: console,
  yaml,
})).lintFs();
