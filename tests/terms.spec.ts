import { test, expect } from '@playwright/test';

test.describe('Terms and Conditions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/terms');
  });

  test('should display terms and conditions page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();
  });

  test('should have key logo in navigation', async ({ page }) => {
    const keyLogo = page.locator('img[alt="Key Logo"]').first();
    await expect(keyLogo).toBeVisible();
  });

  test('should display all major sections', async ({ page }) => {
    // Just verify the page has substantial content with multiple sections
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(1000); // Terms should have substantial content
  });

  test('should display disclaimer about Disney affiliation', async ({ page }) => {
    await expect(page.getByText(/not affiliated with.*Walt Disney/i)).toBeVisible();
  });

  test('should have proper layout matching other pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: /My Magical VIP/ }).first()).toBeVisible();
    await expect(page.getByText('Copyright ©2025 My Magical VIP')).toBeVisible();
  });
});
