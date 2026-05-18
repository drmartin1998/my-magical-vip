import { test, expect } from '@playwright/test';
import { getBookingWindowEndDate } from '@/lib/dates';

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
