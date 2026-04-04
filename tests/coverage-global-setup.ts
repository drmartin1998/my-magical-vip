import { CoverageReport } from 'monocart-coverage-reports';

import { coverageEnabled, coverageReportOptions } from './coverage-options';

async function globalSetup(): Promise<void> {
  if (!coverageEnabled) {
    return;
  }

  const coverageReport = new CoverageReport(coverageReportOptions);
  coverageReport.clean();
  coverageReport.cleanCache();
}

export default globalSetup;
