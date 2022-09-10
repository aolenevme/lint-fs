import fs from 'node:fs/promises';
import yaml from 'js-yaml';

import drivers from './drivers/drivers.js';
import useCases from './useCases/useCases.js';

useCases(drivers({ fs, yaml })).lintFs();
