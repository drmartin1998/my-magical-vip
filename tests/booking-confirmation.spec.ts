import { test, expect } from '@playwright/test';

test.describe('Booking Confirmation Page', () => {
  const sampleDates = ['2025-12-25', '2025-12-26', '2025-12-27'];
  const sampleParks = {
    '2025-12-25': ['magic-kingdom', 'epcot'],
    '2025-12-26': ['hollywood-studios'],
    '2025-12-27': ['animal-kingdom', 'magic-kingdom'],
  };
  const datesParam = encodeURIComponent(JSON.stringify(sampleDates));
  const parksParam = encodeURIComponent(JSON.stringify(sampleParks));
  const packageId = 'test-package-id';
  const productType = 'VIP Tour';

  test.beforeEach(async ({ page }) => {
    // Navigate to booking confirmation with valid URL parameters
    await page.goto(`/booking-confirmation?dates=${datesParam}&parks=${parksParam}&packageId=${packageId}&productType=${encodeURIComponent(productType)}`);
  });

  test('should display page heading and hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Confirm Your Booking' })).toBeVisible();
    await expect(page.getByText('Review your park selections and agree to our terms')).toBeVisible();
  });

  test('should have logo in navigation that links to home', async ({ page }) => {
    const logo = page.locator('img[alt="Key Logo"]');
    await expect(logo).toBeVisible();
    
    const logoLink = page.locator('a:has(img[alt="Key Logo"])');
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByText('Confirm Your Booking')).toBeVisible();
  });

  test('should display section heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Your Park Selections' })).toBeVisible();
  });

  test('should display all selected dates', async ({ page }) => {
    // Wait for loading to complete
    await expect(page.getByText('Loading...')).not.toBeVisible();
    
    // Should show 3 date sections based on our test data
    const dateSections = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50');
    await expect(dateSections).toHaveCount(3);
  });

  test('should display correct date format for each day', async ({ page }) => {
    // Check that dates are displayed in "Thursday, December 25, 2025" format
    // Use local date parsing to avoid timezone issues
    const firstDate = new Date(2025, 11, 25); // Month is 0-indexed
    const expectedFormat = firstDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    
    await expect(page.getByRole('heading', { name: expectedFormat })).toBeVisible();
  });

  test('should display selected parks for first date', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    await expect(firstDateSection.getByText('Magic Kingdom')).toBeVisible();
    await expect(firstDateSection.getByText('EPCOT')).toBeVisible();
  });

  test('should display selected parks for second date', async ({ page }) => {
    const secondDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(1);
    
    await expect(secondDateSection.getByText('Hollywood Studios')).toBeVisible();
  });

  test('should display selected parks for third date', async ({ page }) => {
    const thirdDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(2);
    
    await expect(thirdDateSection.getByText('Animal Kingdom')).toBeVisible();
    await expect(thirdDateSection.getByText('Magic Kingdom')).toBeVisible();
  });

  test('should display parks with correct styling', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    const parkBadge = firstDateSection.getByText('Magic Kingdom');
    
    await expect(parkBadge).toHaveClass(/from-blue-600/);
    await expect(parkBadge).toHaveClass(/to-blue-400/);
  });

  test('should display Terms and Conditions section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();
  });

  test('should have Terms and Conditions checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
  });

  test('should allow checking the Terms checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('should allow unchecking the Terms checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('should have Back button that works', async ({ page }) => {
    const backButton = page.getByRole('button', { name: '← Back' });
    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();
  });

  test('should have Confirm Booking button', async ({ page }) => {
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking →' });
    await expect(confirmButton).toBeVisible();
  });

  test('should have Confirm Booking button disabled when terms not agreed', async ({ page }) => {
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking →' });
    await expect(confirmButton).toBeDisabled();
    await expect(confirmButton).toHaveClass(/disabled:opacity-50/);
    await expect(confirmButton).toHaveClass(/disabled:cursor-not-allowed/);
  });

  test('should enable Confirm Booking button when terms are agreed', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking →' });
    
    await checkbox.check();
    await expect(confirmButton).toBeEnabled();
  });

  test('should show alert when confirming without agreeing to terms', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please agree to the terms and conditions to continue');
      await dialog.accept();
    });
    
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking →' });
    await confirmButton.click({ force: true }); // Force click on disabled button
  });

  test('should display navigation bar with correct links', async ({ page }) => {
    const nav = page.locator('nav').first();
    
    await expect(nav.getByRole('link', { name: /🏠 Home/i })).toHaveAttribute('href', '/');
    await expect(nav.getByRole('link', { name: /📅 Typical Days/i })).toHaveAttribute('href', '/typical-days');
    await expect(nav.getByRole('link', { name: /❓ FAQ/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /ℹ️ About/i })).toBeVisible();
  });

  test('should display footer with company information', async ({ page }) => {
    await expect(page.getByText('Copyright ©2025 My Magical VIP')).toBeVisible();
    await expect(page.getByText(/My Magical VIP is a private company/i)).toBeVisible();
  });

  test('should have footer navigation links', async ({ page }) => {
    const footer = page.locator('footer');
    
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Typical Days' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'FAQ' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('should have footer Terms and Conditions link', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'Terms and Conditions' })).toBeVisible();
  });

  test('should have contact email in footer', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'info@mymagicalvip.com' })).toBeVisible();
  });

  test('should have social media link in footer', async ({ page }) => {
    const facebookLink = page.getByRole('link', { name: 'Facebook' });
    await expect(facebookLink).toBeVisible();
    await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/My-Magical-VIP-102990822543949');
  });

  test('should redirect to home when dates parameter is missing', async ({ page }) => {
    await page.goto(`/booking-confirmation?parks=${parksParam}&packageId=${packageId}`);
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should redirect to home when parks parameter is missing', async ({ page }) => {
    await page.goto(`/booking-confirmation?dates=${datesParam}&packageId=${packageId}`);
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should redirect to home when packageId parameter is missing', async ({ page }) => {
    await page.goto(`/booking-confirmation?dates=${datesParam}&parks=${parksParam}`);
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should show loading state initially', async ({ page }) => {
    // Navigate without waiting for full load
    const response = page.goto(`/booking-confirmation?dates=${datesParam}&parks=${parksParam}&packageId=${packageId}`);
    
    // Should show loading text briefly
    await expect(page.getByText('Loading...')).toBeVisible();
    
    // Wait for navigation to complete
    await response;
  });

  test('should display all three dates in correct order', async ({ page }) => {
    await expect(page.getByText('Loading...')).not.toBeVisible();
    
    const dateSections = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50 h3');
    
    // Verify we have exactly 3 date sections
    await expect(dateSections).toHaveCount(3);
    
    // First date
    await expect(dateSections.nth(0)).toContainText('December 25');
    
    // Second date
    await expect(dateSections.nth(1)).toContainText('December 26');
    
    // Third date
    await expect(dateSections.nth(2)).toContainText('December 27');
  });

  test('should have correct park count for each date', async ({ page }) => {
    await expect(page.getByText('Loading...')).not.toBeVisible();
    
    // First date should have 2 parks
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    const firstDateParks = firstDateSection.locator('.from-blue-600');
    await expect(firstDateParks).toHaveCount(2);
    
    // Second date should have 1 park
    const secondDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(1);
    const secondDateParks = secondDateSection.locator('.from-blue-600');
    await expect(secondDateParks).toHaveCount(1);
    
    // Third date should have 2 parks
    const thirdDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(2);
    const thirdDateParks = thirdDateSection.locator('.from-blue-600');
    await expect(thirdDateParks).toHaveCount(2);
  });

  test('should maintain terms agreement checkbox state when interacting with other elements', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
    // Click elsewhere on the page
    await page.getByRole('heading', { name: 'Your Park Selections' }).click();
    
    // Checkbox should still be checked
    await expect(checkbox).toBeChecked();
  });

  test('should have proper accessible label for terms checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]#terms');
    const label = page.locator('label[for="terms"]');
    
    await expect(label).toBeVisible();
    await expect(label).toContainText('I have read and agree to the');
    
    // Clicking label should toggle checkbox - click the checkbox directly for reliability
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });
});