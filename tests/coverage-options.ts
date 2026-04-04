import path from 'node:path';

import type { CoverageReportOptions, V8CoverageEntry } from 'monocart-coverage-reports';

const projectRoot = process.cwd();
const includedSourceRoots = ['app/', 'components/', 'lib/', 'proxy.ts'];

const normalizePath = (filePath: string): string => {
  let normalized = filePath.replace(/\\/g, '/');

  normalized = normalized
    .replace(/^webpack:\/\/_N_E\/\.?\//, '')
    .replace(/^webpack:\/\/_N_E\//, '')
    .replace(/^file:\/\/\/?/, '');

  if (path.isAbsolute(normalized)) {
    normalized = path.relative(projectRoot, normalized).replace(/\\/g, '/');
  }

  if (normalized.startsWith('./')) {
    normalized = normalized.slice(2);
  }

  return normalized;
};

const isTrackedSource = (sourcePath: string): boolean => {
  const normalized = normalizePath(sourcePath);

  if (normalized.includes('/node_modules/') || normalized.startsWith('node_modules/')) {
    return false;
  }

  if (normalized.includes('/.next/') || normalized.startsWith('.next/')) {
    return false;
  }

  return includedSourceRoots.some((prefix) => normalized === prefix || normalized.startsWith(prefix));
};

const isTrackedEntry = (entry: V8CoverageEntry): boolean => {
  const normalizedUrl = entry.url.replace(/\\/g, '/');

  return (
    normalizedUrl.startsWith('http://localhost:3000/') ||
    normalizedUrl.startsWith('http://127.0.0.1:3000/')
  );
};

export const coverageEnabled =
  process.env.PLAYWRIGHT_COLLECT_COVERAGE === '1' ||
  process.env.npm_lifecycle_event === 'test:coverage';

export const coverageReportOptions: CoverageReportOptions = {
  name: 'My Magical VIP Playwright Coverage',
  outputDir: path.join(projectRoot, 'coverage'),
  reports: [
    ['console-summary'],
    ['v8'],
    ['lcovonly', { file: 'lcov.info' }],
    ['json-summary', { file: 'coverage-summary.json' }],
  ],
  logging: 'error',
  clean: false,
  cleanCache: false,
  entryFilter: isTrackedEntry,
  sourcePath: (filePath) => normalizePath(filePath),
  sourceFilter: (sourcePath) => isTrackedSource(sourcePath),
};
