import { test, expect, type Page } from '@playwright/test';
import { getBookingWindowEndDate } from '@/lib/dates';

/** Returns a YYYY-MM-DD date key offset from today by `days` */
function futureDateKey(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

/**
 * Navigate the open calendar to the month that contains `dateKey`.
 * Assumes the calendar modal is already open.
 */
async function navigateToDateMonth(page: Page, dateKey: string): Promise<void> {
  const target = new Date(dateKey + 'T00:00:00');
  const targetMonth = target.toLocaleString('default', { month: 'long', year: 'numeric' });
  const monthHeading = page.getByTestId('calendar-month');
  const nextButton = page.getByRole('button', { name: 'Next month' });

  for (let i = 0; i < 13; i++) {
    if ((await monthHeading.textContent()) === targetMonth) break;
    if (await nextButton.isDisabled()) break;
    await nextButton.click();
  }
}

test.describe('Calendar Date Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open calendar modal when clicking Get Started', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Select Your Trip Dates')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
  });

  test('should display current month and navigation arrows', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    
    const monthYear = page.locator('text=/January|February|March|April|May|June|July|August|September|October|November|December/');
    await expect(monthYear).toBeVisible();
    
    // const prevButton = page.locator('button:has-text("‹")');
    // const nextButton = page.locator('button:has-text("›")');
    const prevButton = page.getByRole('button', { name: 'Previous month' });
    const nextButton = page.getByRole('button', { name: 'Next month' });
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });

  test('should navigate to next month', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    
    const monthHeading = page.getByTestId('calendar-month');
    const monthYearBefore = await monthHeading.textContent();
    
    await page.getByRole('button', { name: 'Next month' }).click();
    
    const monthYearAfter = await monthHeading.textContent();

    expect(monthYearBefore).not.toBe(monthYearAfter);
  });

  test('should allow navigation through the 12 month booking window only', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();

    const monthHeading = page.getByTestId('calendar-month');
    const nextButton = page.getByRole('button', { name: 'Next month' });
    const bookingWindowEndDate = getBookingWindowEndDate();
    const lastAvailableMonth = bookingWindowEndDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    for (let i = 0; i < 13; i += 1) {
      if ((await monthHeading.textContent()) === lastAvailableMonth) {
        break;
      }

      await expect(nextButton).toBeEnabled();
      await nextButton.click();
    }

    await expect(monthHeading).toHaveText(lastAvailableMonth);
    await expect(nextButton).toBeDisabled();
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Select Your Trip Dates')).toBeVisible();
    
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Select Your Trip Dates')).not.toBeVisible();
  });
});

test.describe('Near-Full Booking Indicator', () => {
  /**
   * Shared setup: intercept both blackout-dates and date-capacity so tests
   * are fully deterministic and do not depend on real database state.
   */
  test.beforeEach(async ({ page }) => {
    // No blackout dates – keeps all future dates clickable.
    await page.route('/api/blackout-dates', (route) =>
      route.fulfill({ json: { blackoutDates: [] } })
    );
  });

  test('shows near-full banner and legend when at least one date in the current month is near-full', async ({ page }) => {
    // Pick a date ~15 days in the future so it falls in the visible month.
    const nearFullDate = futureDateKey(15);

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [nearFullDate],
          capacityData: {
            [nearFullDate]: { count: 2, capacity: 3, percentage: 2 / 3, nearFull: true },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();

    // Wait for loading spinner to disappear
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // Navigate to the month that contains the near-full date
    await navigateToDateMonth(page, nearFullDate);

    // Banner should be visible
    await expect(page.getByTestId('near-full-banner')).toBeVisible();
    await expect(page.getByTestId('near-full-banner')).toContainText('Hurry!');
    await expect(page.getByTestId('near-full-banner')).toContainText('almost fully booked');

    // Legend should be visible
    await expect(page.getByTestId('near-full-legend')).toBeVisible();
    await expect(page.getByTestId('near-full-legend')).toContainText('Almost fully booked');
  });

  test('highlights the near-full date cell with orange styling and flame badge', async ({ page }) => {
    const nearFullDate = futureDateKey(15);

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [nearFullDate],
          capacityData: {
            [nearFullDate]: { count: 2, capacity: 3, percentage: 2 / 3, nearFull: true },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // Navigate to the month containing the near-full date
    await navigateToDateMonth(page, nearFullDate);

    // Date button should carry the near-full testid
    const dateBtn = page.getByTestId(`near-full-date-${nearFullDate}`);
    await expect(dateBtn).toBeVisible();

    // Flame badge should also be present alongside the button
    const badge = page.getByTestId(`near-full-badge-${nearFullDate}`);
    await expect(badge).toBeVisible();

    // The button's accessible label must include "almost fully booked"
    await expect(dateBtn).toHaveAttribute('aria-label', /almost fully booked/i);
  });

  test('near-full date is still selectable', async ({ page }) => {
    const nearFullDate = futureDateKey(15);

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [nearFullDate],
          capacityData: {
            [nearFullDate]: { count: 2, capacity: 3, percentage: 2 / 3, nearFull: true },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // Navigate to the month containing the near-full date
    await navigateToDateMonth(page, nearFullDate);

    const dateBtn = page.getByTestId(`near-full-date-${nearFullDate}`);
    await expect(dateBtn).toBeEnabled();

    // Click it – the flame badge should disappear (selected state takes over)
    await dateBtn.click();
    await expect(page.getByTestId(`near-full-badge-${nearFullDate}`)).not.toBeVisible();

    // The selected dates list should show the date
    await expect(page.getByText('Selected Dates:')).toBeVisible();
  });

  test('does NOT show near-full banner when no near-full dates exist', async ({ page }) => {
    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: { nearFullDates: [], capacityData: {} },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    await expect(page.getByTestId('near-full-banner')).not.toBeVisible();
    await expect(page.getByTestId('near-full-legend')).not.toBeVisible();
  });

  test('does NOT show banner for near-full dates in a different month', async ({ page }) => {
    // Use a date ~45 days away — likely the next month.
    const farDate = futureDateKey(45);

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [farDate],
          capacityData: {
            [farDate]: { count: 2, capacity: 3, percentage: 2 / 3, nearFull: true },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // The far date is in a different month so no banner in the current view
    // (this assertion only holds when farDate is genuinely in the next calendar month)
    const today = new Date();
    const farDateObj = new Date(farDate + 'T00:00:00');
    const isSameMonth =
      farDateObj.getMonth() === today.getMonth() &&
      farDateObj.getFullYear() === today.getFullYear();

    if (!isSameMonth) {
      await expect(page.getByTestId('near-full-banner')).not.toBeVisible();
    }
    // If it happens to land in the same month, we skip the assertion
    // to avoid a flaky test at month boundaries.
  });

  test('near-full indicator adjusts after navigating to the month containing the near-full date', async ({ page }) => {
    // Place the near-full date 45+ days away (next month or later)
    const farDate = futureDateKey(45);
    const today = new Date();
    const farDateObj = new Date(farDate + 'T00:00:00');
    const isSameMonth =
      farDateObj.getMonth() === today.getMonth() &&
      farDateObj.getFullYear() === today.getFullYear();

    // Skip the rest of this test if the date lands in the current month
    // (calendar can be at most 1 day off at month boundaries)
    if (isSameMonth) {
      return;
    }

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [farDate],
          capacityData: {
            [farDate]: { count: 2, capacity: 3, percentage: 2 / 3, nearFull: true },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // No banner in current month
    await expect(page.getByTestId('near-full-banner')).not.toBeVisible();

    // Navigate forward until the near-full date's month is visible
    const targetMonth = farDateObj.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    const monthHeading = page.getByTestId('calendar-month');
    const nextButton = page.getByRole('button', { name: 'Next month' });

    for (let i = 0; i < 5; i++) {
      if ((await monthHeading.textContent()) === targetMonth) break;
      await nextButton.click();
    }

    await expect(monthHeading).toHaveText(targetMonth);

    // Banner should now be visible
    await expect(page.getByTestId('near-full-banner')).toBeVisible();
    await expect(page.getByTestId(`near-full-date-${farDate}`)).toBeVisible();
  });

  test('gracefully handles a date-capacity API error (no banner, calendar still loads)', async ({ page }) => {
    await page.route('/api/date-capacity', (route) =>
      route.fulfill({ status: 500, json: { error: 'Internal Server Error' } })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    // Calendar should still render normally
    await expect(page.getByTestId('calendar-month')).toBeVisible();
    // No near-full banner shown on error
    await expect(page.getByTestId('near-full-banner')).not.toBeVisible();
  });

  test('does not show a near-full indicator for a fully booked blackout date', async ({ page }) => {
    const fullDate = futureDateKey(15);

    await page.route('/api/blackout-dates', (route) =>
      route.fulfill({ json: { blackoutDates: [fullDate] } })
    );

    await page.route('/api/date-capacity', (route) =>
      route.fulfill({
        json: {
          nearFullDates: [],
          capacityData: {
            [fullDate]: { count: 3, capacity: 3, percentage: 1, nearFull: false },
          },
        },
      })
    );

    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Loading availability...')).not.toBeVisible();

    await navigateToDateMonth(page, fullDate);

    await expect(page.getByTestId('near-full-banner')).not.toBeVisible();
    await expect(page.getByTestId(`near-full-date-${fullDate}`)).not.toBeVisible();
  });
});
