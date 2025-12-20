import { test, expect, type Page } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading and hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('My Magical VIP');
    await expect(page.getByText('Experience Disney World Like Never Before')).toBeVisible();
  });

  test('should display all package cards', async ({ page }) => {
    // Check for at least 6 packages
    const packageCards = page.locator('h3:has-text("Magical VIP Package")');
    const count = await packageCards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('should display "Get Started" buttons on packages', async ({ page }) => {
    const getStartedButtons = page.getByRole('button', { name: 'Get Started' });
    const count = await getStartedButtons.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('should have navigation link to typical days page', async ({ page }) => {
    const typicalDaysLink = page.getByRole('link', { name: /typical days/i });
    await expect(typicalDaysLink).toBeVisible();
    await expect(typicalDaysLink).toHaveAttribute('href', '/typical-days');
  });

  test('should display testimonials section', async ({ page }) => {
    await expect(page.getByText('What Our Customers Say')).toBeVisible();
  });

  test('should display footer with copyright', async ({ page }) => {
    await expect(page.getByText('Copyright ©2025 My Magical VIP')).toBeVisible();
    await expect(page.getByText(/not affiliated with.*Walt Disney Company/i)).toBeVisible();
  });

  test('should have all three main sections', async ({ page }) => {
    await expect(page.getByText('Overview')).toBeVisible();
    await expect(page.getByText('Available Packages')).toBeVisible();
    await expect(page.getByText('What Our Customers Say')).toBeVisible();
  });
});
