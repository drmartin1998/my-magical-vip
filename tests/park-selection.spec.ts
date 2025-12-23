import { test, expect } from '@playwright/test';

test.describe('Park Selection Page', () => {
  const sampleDates = ['2025-12-25', '2025-12-26', '2025-12-27'];
  const datesParam = encodeURIComponent(JSON.stringify(sampleDates));
  const packageId = 'test-package-id';
  const productType = 'VIP Tour';

  test.beforeEach(async ({ page }) => {
    // Navigate to park selection with valid URL parameters
    await page.goto(`/park-selection?dates=${datesParam}&packageId=${packageId}&productType=${encodeURIComponent(productType)}`);
  });

  test('should display page heading and hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Select Your Parks' })).toBeVisible();
  });

  test('should have logo in navigation that links to home', async ({ page }) => {
    const logo = page.locator('img[alt="Key Logo"]');
    await expect(logo).toBeVisible();
    
    const logoLink = page.locator('a:has(img[alt="Key Logo"])');
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByText('Park Selection')).toBeVisible();
  });

  test('should display instructions box with requirements', async ({ page }) => {
    await expect(page.getByText('Select which park you would like VIP services for each day')).toBeVisible();
    await expect(page.getByText('Limit two parks per day')).toBeVisible();
    await expect(page.getByText(/park-hopper is required/i)).toBeVisible();
    await expect(page.getByText('Limit 10 guests per party')).toBeVisible();
  });

  test('should display all selected dates', async ({ page }) => {
    // Wait for loading to complete
    await expect(page.getByText('Loading...')).not.toBeVisible();
    
    // Should show 3 date sections based on our test data
    const dateSections = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50');
    await expect(dateSections).toHaveCount(3);
  });

  test('should display all four Disney parks for each date', async ({ page }) => {
    // Get first date section
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    // Check all four parks are present
    await expect(firstDateSection.getByRole('button', { name: 'Magic Kingdom' })).toBeVisible();
    await expect(firstDateSection.getByRole('button', { name: 'EPCOT' })).toBeVisible();
    await expect(firstDateSection.getByRole('button', { name: 'Hollywood Studios' })).toBeVisible();
    await expect(firstDateSection.getByRole('button', { name: 'Animal Kingdom' })).toBeVisible();
  });

  test('should display correct date format for each day', async ({ page }) => {
    // Check that dates are displayed in "Friday, December 25, 2025" format
    const firstDate = new Date('2025-12-25');
    const expectedFormat = firstDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    
    await expect(page.getByRole('heading', { name: expectedFormat })).toBeVisible();
  });

  test('should allow selecting a park', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    const magicKingdomButton = firstDateSection.getByRole('button', { name: 'Magic Kingdom' });
    
    // Initially not selected
    await expect(magicKingdomButton).not.toHaveClass(/from-blue-600/);
    
    // Click to select
    await magicKingdomButton.click();
    
    // Should now be selected with checkmark
    await expect(firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ })).toBeVisible();
    await expect(magicKingdomButton).toHaveClass(/from-blue-600/);
  });

  test('should allow deselecting a park', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    const magicKingdomButton = firstDateSection.getByRole('button', { name: 'Magic Kingdom' });
    
    // Select park
    await magicKingdomButton.click();
    await expect(firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ })).toBeVisible();
    
    // Deselect park
    await magicKingdomButton.click();
    await expect(firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ })).not.toBeVisible();
  });

  test('should allow selecting up to 2 parks per day', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    // Select first park
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await expect(firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ })).toBeVisible();
    
    // Select second park
    await firstDateSection.getByRole('button', { name: 'EPCOT' }).click();
    await expect(firstDateSection.getByRole('button', { name: /✓ EPCOT/ })).toBeVisible();
  });

  test('should disable other parks when 2 parks are selected', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    // Select 2 parks
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await firstDateSection.getByRole('button', { name: 'EPCOT' }).click();
    
    // Other parks should be disabled
    const hollywoodButton = firstDateSection.getByRole('button', { name: 'Hollywood Studios' });
    const animalKingdomButton = firstDateSection.getByRole('button', { name: 'Animal Kingdom' });
    
    await expect(hollywoodButton).toBeDisabled();
    await expect(animalKingdomButton).toBeDisabled();
    await expect(hollywoodButton).toHaveClass(/cursor-not-allowed/);
  });

  test('should re-enable parks when deselecting from 2 parks', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    // Select 2 parks
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await firstDateSection.getByRole('button', { name: 'EPCOT' }).click();
    
    // Verify other parks are disabled
    await expect(firstDateSection.getByRole('button', { name: 'Hollywood Studios' })).toBeDisabled();
    
    // Deselect one park
    await firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ }).click();
    
    // Other parks should be enabled again
    await expect(firstDateSection.getByRole('button', { name: 'Hollywood Studios' })).not.toBeDisabled();
    await expect(firstDateSection.getByRole('button', { name: 'Animal Kingdom' })).not.toBeDisabled();
  });

  test('should show correct status text when no parks selected', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    await expect(firstDateSection.getByText('Select at least 1 park for this day')).toBeVisible();
  });

  test('should show correct status text when 1 park selected', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await expect(firstDateSection.getByText('1 park selected - you can add 1 more')).toBeVisible();
  });

  test('should show correct status text when 2 parks selected', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').first();
    
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await firstDateSection.getByRole('button', { name: 'EPCOT' }).click();
    await expect(firstDateSection.getByText('2 parks selected (maximum reached)')).toBeVisible();
  });

  test('should maintain independent selections for different dates', async ({ page }) => {
    const firstDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(0);
    const secondDateSection = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50').nth(1);
    
    // Select different parks for different dates
    await firstDateSection.getByRole('button', { name: 'Magic Kingdom' }).click();
    await secondDateSection.getByRole('button', { name: 'EPCOT' }).click();
    
    // Verify selections are independent
    await expect(firstDateSection.getByRole('button', { name: /✓ Magic Kingdom/ })).toBeVisible();
    await expect(secondDateSection.getByRole('button', { name: /✓ EPCOT/ })).toBeVisible();
    
    // First date should not have EPCOT selected
    await expect(firstDateSection.getByRole('button', { name: 'EPCOT' })).not.toHaveClass(/from-blue-600/);
    
    // Second date should not have Magic Kingdom selected
    await expect(secondDateSection.getByRole('button', { name: 'Magic Kingdom' })).not.toHaveClass(/from-blue-600/);
  });

  test('should have Back button that works', async ({ page }) => {
    const backButton = page.getByRole('button', { name: '← Back' });
    await expect(backButton).toBeVisible();
    
    // Note: Testing actual navigation back would require setting up the full flow
    // We're just verifying the button exists and is clickable
    await expect(backButton).toBeEnabled();
  });

  test('should have Confirm Parks button', async ({ page }) => {
    const confirmButton = page.getByRole('button', { name: 'Confirm Parks →' });
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();
  });

  test('should show alert when confirming without selecting parks for all days', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please select at least one park for each day');
      await dialog.accept();
    });
    
    // Don't select any parks
    const confirmButton = page.getByRole('button', { name: 'Confirm Parks →' });
    await confirmButton.click();
  });

  test('should navigate to booking confirmation when all days have parks selected', async ({ page }) => {
    // Select at least one park for each day
    const dateSections = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50');
    
    for (let i = 0; i < 3; i++) {
      const section = dateSections.nth(i);
      await section.getByRole('button', { name: 'Magic Kingdom' }).click();
    }
    
    // Click confirm
    const confirmButton = page.getByRole('button', { name: 'Confirm Parks →' });
    await confirmButton.click();
    
    // Should navigate to booking confirmation page
    await page.waitForURL(/\/booking-confirmation/);
    expect(page.url()).toContain('/booking-confirmation');
    expect(page.url()).toContain('dates=');
    expect(page.url()).toContain('parks=');
    expect(page.url()).toContain(`packageId=${packageId}`);
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

  test('should have contact email in footer', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'info@mymagicalvip.com' })).toBeVisible();
  });

  test('should have social media link in footer', async ({ page }) => {
    const facebookLink = page.getByRole('link', { name: 'Facebook' });
    await expect(facebookLink).toBeVisible();
    await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/My-Magical-VIP-102990822543949');
  });

  test('should redirect to home when dates parameter is missing', async ({ page }) => {
    await page.goto(`/park-selection?packageId=${packageId}`);
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should redirect to home when packageId parameter is missing', async ({ page }) => {
    await page.goto(`/park-selection?dates=${datesParam}`);
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should show loading state initially', async ({ page }) => {
    // Navigate without waiting for full load
    const response = page.goto(`/park-selection?dates=${datesParam}&packageId=${packageId}`);
    
    // Should show loading text briefly
    await expect(page.getByText('Loading...')).toBeVisible();
    
    // Wait for navigation to complete
    await response;
  });

  test('should display navigation bar with correct links', async ({ page }) => {
    const nav = page.locator('nav').first();
    
    await expect(nav.getByRole('link', { name: /🏠 Home/i })).toHaveAttribute('href', '/');
    await expect(nav.getByRole('link', { name: /📅 Typical Days/i })).toHaveAttribute('href', '/typical-days');
    await expect(nav.getByRole('link', { name: /❓ FAQ/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /ℹ️ About/i })).toBeVisible();
  });

  test('should preserve productType in confirmation URL', async ({ page }) => {
    // Select parks for all days
    const dateSections = page.locator('.bg-gradient-to-br.from-blue-50.to-emerald-50');
    
    for (let i = 0; i < 3; i++) {
      await dateSections.nth(i).getByRole('button', { name: 'Magic Kingdom' }).click();
    }
    
    // Confirm
    await page.getByRole('button', { name: 'Confirm Parks →' }).click();
    
    // Check URL includes productType
    await page.waitForURL(/\/booking-confirmation/);
    expect(page.url()).toContain(`productType=${encodeURIComponent(productType)}`);
  });
});
