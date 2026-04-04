import { test as base, expect, type Page } from '@playwright/test';
import { CoverageReport } from 'monocart-coverage-reports';

import { coverageEnabled, coverageReportOptions } from './coverage-options';

const test = base.extend({
  page: async ({ page, browserName }, use) => {
    const shouldCollectCoverage = coverageEnabled && browserName === 'chromium';

    if (shouldCollectCoverage) {
      await Promise.all([
        page.coverage.startJSCoverage({ resetOnNavigation: false }),
        page.coverage.startCSSCoverage({ resetOnNavigation: false }),
      ]);
    }

    await use(page);

    if (!shouldCollectCoverage || page.isClosed()) {
      return;
    }

    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    const coverageReport = new CoverageReport(coverageReportOptions);
    await coverageReport.add([...jsCoverage, ...cssCoverage]);
  },
});

export { test, expect, type Page };
