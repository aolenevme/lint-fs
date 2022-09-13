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

// 3. улучшить здесь
logger.log(await useCases({
  config,
  filesystem,
}).lintFs());
