import { CoverageReport } from 'monocart-coverage-reports';

import { coverageEnabled, coverageReportOptions } from './coverage-options';

async function globalTeardown(): Promise<void> {
  if (!coverageEnabled) {
    return;
  }

  const coverageReport = new CoverageReport(coverageReportOptions);

  if (!coverageReport.hasCache()) {
    return;
  }

  await coverageReport.generate();
}

export default globalTeardown;
