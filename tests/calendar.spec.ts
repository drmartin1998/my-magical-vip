import { test, expect, type Page } from '@playwright/test';

test.describe('Calendar Date Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open calendar modal when clicking Get Started', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Select Your Visit Dates')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm Dates' })).toBeVisible();
  });

  test('should display current month and navigation arrows', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    
    const monthYear = page.locator('text=/January|February|March|April|May|June|July|August|September|October|November|December/');
    await expect(monthYear).toBeVisible();
    
    const prevButton = page.locator('button:has-text("‹")');
    const nextButton = page.locator('button:has-text("›")');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });

  test('should navigate to next month', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    
    const monthYearBefore = await page.locator('text=/\\w+ \\d{4}/').first().textContent();
    await page.locator('button:has-text("›")').click();
    const monthYearAfter = await page.locator('text=/\\w+ \\d{4}/').first().textContent();
    
    expect(monthYearBefore).not.toBe(monthYearAfter);
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).first().click();
    await expect(page.getByText('Select Your Visit Dates')).toBeVisible();
    
    await page.getByRole('button', { name: '✕' }).click();
    await expect(page.getByText('Select Your Visit Dates')).not.toBeVisible();
  });
});
