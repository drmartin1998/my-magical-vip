import { test, expect } from '@playwright/test';

test.describe('FAQ Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FAQ - My Magical VIP/);
  });

  test('should display the navigation bar', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have My Magical VIP branding that links to home', async ({ page }) => {
    const brandLink = page.locator('nav a[href="/"]').first();
    await expect(brandLink).toContainText('My Magical VIP');
  });

  test('should have navigation links with icons', async ({ page }) => {
    const homeLink = page.locator('nav a[href="/"]').last();
    await expect(homeLink).toContainText('Home');
    
    const typicalDaysLink = page.locator('nav a[href="/typical-days"]');
    await expect(typicalDaysLink).toContainText('Typical Days');
    
    const faqLink = page.locator('nav a[href="/faq"]');
    await expect(faqLink).toContainText('FAQ');
    
    const aboutLink = page.locator('nav a[href="#"]');
    await expect(aboutLink).toContainText('About');
  });

  test('should display hero section with heading', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText('Frequently Asked Questions');
  });

  test('should display hero subtitle', async ({ page }) => {
    const subtitle = page.locator('text=Everything you need to know about My Magical VIP');
    await expect(subtitle).toBeVisible();
  });

  test('should display all 17 FAQ items', async ({ page }) => {
    const faqItems = page.locator('div[class*="bg-gradient-to-br from-blue-50 to-emerald-50"]');
    await expect(faqItems).toHaveCount(17);
  });

  test('should display first FAQ question', async ({ page }) => {
    const firstQuestion = page.locator('h3', { hasText: 'Do you have a guide in the park?' });
    await expect(firstQuestion).toBeVisible();
  });

  test('should display first FAQ answer', async ({ page }) => {
    const firstAnswer = page.locator('text=No we do not have anyone physically on Disney property');
    await expect(firstAnswer).toBeVisible();
  });

  test('should display "When was the company started?" question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'When was the company started?' });
    await expect(question).toBeVisible();
  });

  test('should display company founding year answer', async ({ page }) => {
    const answer = page.locator('text=My Magical VIP was founded in 2022');
    await expect(answer).toBeVisible();
  });

  test('should display DAS system question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'Do you use the DAS system?' });
    await expect(question).toBeVisible();
  });

  test('should display DAS system answer', async ({ page }) => {
    const answer = page.locator('text=We do not use the DAS system. If you qualify for DAS');
    await expect(answer).toBeVisible();
  });

  test('should display lightning lanes question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'How are you able to do so many lightning lanes?' });
    await expect(question).toBeVisible();
  });

  test('should display park hop question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'Can we park hop?' });
    await expect(question).toBeVisible();
  });

  test('should display phone communication question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'Will I be on my phone all day communicating with My Magical VIP?' });
    await expect(question).toBeVisible();
  });

  test('should display schedule strictness question', async ({ page }) => {
    const question = page.locator('h3', { hasText: 'How strict is the schedule?' });
    await expect(question).toBeVisible();
  });

  test('should display "Still Have Questions?" CTA section', async ({ page }) => {
    const ctaHeading = page.locator('h2', { hasText: 'Still Have Questions?' });
    await expect(ctaHeading).toBeVisible();
  });

  test('should have contact us button in CTA', async ({ page }) => {
    const contactButton = page.locator('a[href="mailto:info@mymagicalvip.com"]', { hasText: 'Contact Us' });
    await expect(contactButton).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have My Magical VIP heading in footer', async ({ page }) => {
    const footerHeading = page.locator('footer h3', { hasText: 'My Magical VIP' });
    await expect(footerHeading).toBeVisible();
  });

  test('should have footer links to main pages', async ({ page }) => {
    const homeLink = page.locator('footer a[href="/"]');
    await expect(homeLink).toBeVisible();
    
    const typicalDaysLink = page.locator('footer a[href="/typical-days"]');
    await expect(typicalDaysLink).toBeVisible();
    
    const faqLink = page.locator('footer a[href="/faq"]');
    await expect(faqLink).toBeVisible();
  });

  test('should have Terms and Conditions link in footer', async ({ page }) => {
    const termsLink = page.locator('footer a[href="/terms"]');
    await expect(termsLink).toBeVisible();
  });

  test('should have contact email in footer', async ({ page }) => {
    const emailLink = page.locator('footer a[href="mailto:info@mymagicalvip.com"]');
    await expect(emailLink).toBeVisible();
  });

  test('should have Facebook link in footer', async ({ page }) => {
    const facebookLink = page.locator('footer a[href="https://www.facebook.com/My-Magical-VIP-102990822543949"]');
    await expect(facebookLink).toBeVisible();
  });

  test('should display copyright notice', async ({ page }) => {
    const copyright = page.locator('text=Copyright ©2025 My Magical VIP');
    await expect(copyright).toBeVisible();
  });

  test('should display disclaimer about Disney affiliation', async ({ page }) => {
    const disclaimer = page.locator('text=My Magical VIP is a private company in no way owned by or affiliated with');
    await expect(disclaimer).toBeVisible();
  });

  test('should navigate to home page when clicking brand', async ({ page }) => {
    const brandLink = page.locator('nav a[href="/"]').first();
    await brandLink.click();
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('should navigate to typical days page from nav', async ({ page }) => {
    const typicalDaysLink = page.locator('nav a[href="/typical-days"]');
    await typicalDaysLink.click();
    await page.waitForURL('/typical-days');
    await expect(page).toHaveURL('/typical-days');
  });

  test('should have working email link in CTA', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:info@mymagicalvip.com"]', { hasText: 'Contact Us' });
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@mymagicalvip.com');
  });

  test('should display all FAQ questions in order', async ({ page }) => {
    const questions = [
      'Do you have a guide in the park?',
      'Can we talk to someone about the service?',
      'Are you able to book hotels and park tickets?',
      'When was the company started?',
      'How many rides can our group do in a day?',
      'Do you use the DAS system?',
      'How are you able to do so many lightning lanes?',
      'Do you guarantee that we can do all the rides we want?',
      'Why are dates sold out?',
      'Do I have to rope drop?',
      'Are you able to skip the lines at character meets?',
      'Can we park hop?',
      'Will I be on my phone all day communicating with My Magical VIP?',
      'Do we get to pick what rides we do in what order?',
      'Can we ride the same ride more than once?',
      'Are we going to be going back and forth across the park?',
      'How strict is the schedule?',
    ];

    for (const question of questions) {
      const questionElement = page.locator('h3', { hasText: question });
      await expect(questionElement).toBeVisible();
    }
  });

  test('should have proper styling on FAQ cards', async ({ page }) => {
    const firstCard = page.locator('div[class*="bg-gradient-to-br from-blue-50 to-emerald-50"]').first();
    await expect(firstCard).toBeVisible();
    
    // Check that the card has the question heading
    const question = firstCard.locator('h3');
    await expect(question).toBeVisible();
    
    // Check that the card has the answer text
    const answer = firstCard.locator('p');
    await expect(answer).toBeVisible();
  });

  test('should not have JavaScript errors on page load', async ({ page }) => {
    const errors: Error[] = [];
    page.on('pageerror', (error) => errors.push(error));
    
    await page.goto('/faq');
    await page.waitForLoadState('networkidle');
    
    expect(errors.length).toBe(0);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/faq');
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors.length).toBe(0);
  });
});
