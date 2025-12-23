import { test, expect } from '@playwright/test';

test.describe('Typical Days', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/typical-days');
  });

  test('should display the page with correct title and navigation', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Typical Days.*My Magical VIP/);

    // Check hero heading
    await expect(page.locator('h1')).toContainText('Typical Touring Days With Us');

    // Check navigation is present
    await expect(page.locator('nav a[href="/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/typical-days"]')).toBeVisible();

    // Check site name
    const siteLink = page.locator('nav a:has-text("My Magical VIP")').first();
    await expect(siteLink).toBeVisible();
  });

  test('should display all four park sections', async ({ page }) => {
    // Check all four parks are displayed
    await expect(page.getByRole('heading', { name: /Magic Kingdom Typical Day/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Epcot Typical Day/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Hollywood Studios Typical Day/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Animal Kingdom Typical Day/i })).toBeVisible();
  });

  test('should have working Book Now links with green button style', async ({ page }) => {
    // Get all Book Now links
    const bookNowLinks = page.locator('a:has-text("Book Now")');
    
    // Should have 4 Book Now buttons (one per park)
    await expect(bookNowLinks).toHaveCount(4);

    // Check first Book Now button
    const firstBookNow = bookNowLinks.first();
    
    // Should have green-button class
    await expect(firstBookNow).toHaveClass(/green-button/);
    
    // Should link to park-selection page
    await expect(firstBookNow).toHaveAttribute('href', '/park-selection');
    
    // Should have proper styling
    await expect(firstBookNow).toHaveCSS('background-color', 'rgb(46, 125, 50)'); // #2e7d32
  });

  test('should navigate to park selection when clicking Book Now', async ({ page }) => {
    // Click the first Book Now button
    const firstBookNow = page.locator('a:has-text("Book Now")').first();
    await firstBookNow.click();

    // Should navigate to park-selection page
    await expect(page).toHaveURL('/park-selection');
  });

  test('should have working Get Started Today link with green button style', async ({ page }) => {
    // Find the Get Started Today button in CTA section
    const getStartedButton = page.locator('a:has-text("Get Started Today")');
    
    // Should be visible
    await expect(getStartedButton).toBeVisible();
    
    // Should have green-button class
    await expect(getStartedButton).toHaveClass(/green-button/);
    
    // Should link to park-selection page
    await expect(getStartedButton).toHaveAttribute('href', '/park-selection');
    
    // Should have proper styling
    await expect(getStartedButton).toHaveCSS('background-color', 'rgb(46, 125, 50)'); // #2e7d32
  });

  test('should navigate to park selection when clicking Get Started Today', async ({ page }) => {
    // Scroll to the CTA section
    await page.locator('a:has-text("Get Started Today")').scrollIntoViewIfNeeded();
    
    // Click Get Started Today button
    await page.locator('a:has-text("Get Started Today")').click();

    // Should navigate to park-selection page
    await expect(page).toHaveURL('/park-selection');
  });

  test('should display park attractions and descriptions', async ({ page }) => {
    // Check Magic Kingdom has attractions listed
    await expect(page.getByText('Lightning Lane Peter Pan')).toBeVisible();
    await expect(page.getByText('Lightning Lane Seven Dwarfs Mine Train')).toBeVisible();
    
    // Check Epcot has attractions
    await expect(page.getByText(/Boarding Group for Guardians/i)).toBeVisible();
    await expect(page.getByText(/Lightning Lane for Test Track/i)).toBeVisible();
    
    // Check Hollywood Studios has attractions
    await expect(page.getByText(/Lightning Lane Star Wars Rise of the Resistance/i)).toBeVisible();
    
    // Check Animal Kingdom has attractions
    await expect(page.getByText(/Lightning Lane Avatar Flight of Passage/i)).toBeVisible();
  });

  test('should display customization section', async ({ page }) => {
    // Scroll to customization section
    await page.getByRole('heading', { name: 'Customize Your Day' }).scrollIntoViewIfNeeded();
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Customize Your Day' })).toBeVisible();
    
    // Check some customization options
    await expect(page.getByText('Character Meet & Greets')).toBeVisible();
    await expect(page.getByText('Dining Experiences')).toBeVisible();
    await expect(page.getByText('Shows & Entertainment')).toBeVisible();
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    // Check breadcrumb
    const breadcrumb = page.locator('nav ol');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('a[href="/"]')).toContainText('Home');
    await expect(breadcrumb).toContainText('Typical Days');
  });

  test('should display footer with copyright', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Check footer content
    await expect(page.locator('footer')).toContainText('Copyright ©2025 My Magical VIP');
    await expect(page.locator('footer')).toContainText('My Magical VIP is a private company');
  });

  test('should have responsive navigation menu', async ({ page }) => {
    // Check navigation items
    const nav = page.locator('nav').first();
    await expect(nav.locator('a:has-text("Home")')).toBeVisible();
    await expect(nav.locator('a:has-text("Typical Days")')).toBeVisible();
  });

  test('should display park card styling correctly', async ({ page }) => {
    // Get first park card
    const firstParkCard = page.locator('.bg-gradient-to-br').first();
    
    // Should have emerald border
    await expect(firstParkCard).toHaveClass(/border-emerald-500/);
    
    // Should be visible
    await expect(firstParkCard).toBeVisible();
  });
});
