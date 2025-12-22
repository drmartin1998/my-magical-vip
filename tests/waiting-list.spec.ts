import { test, expect } from '@playwright/test';

test.describe('Waiting List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/waiting-list');
  });

  test('should display waiting list page with heading and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Join Our Waiting List' })).toBeVisible();
    await expect(page.getByText(/dates you selected are currently unavailable/i)).toBeVisible();
  });

  test('should have logo in navigation that links to home', async ({ page }) => {
    const logo = page.locator('img[alt="Key Logo"]');
    await expect(logo).toBeVisible();
    
    // Click the logo link
    await page.locator('a:has(img[alt="Key Logo"])').click();
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should display all required form fields', async ({ page }) => {
    // Check for name and email fields
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    
    // Check for date and park fields (at least one day by default)
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('should display all four Disney parks in dropdown', async ({ page }) => {
    const parkSelect = page.locator('select').first();
    
    // Check that all parks are available (options exist in the select)
    const magicKingdom = parkSelect.locator('option[value="magic-kingdom"]');
    const epcot = parkSelect.locator('option[value="epcot"]');
    const hollywoodStudios = parkSelect.locator('option[value="hollywood-studios"]');
    const animalKingdom = parkSelect.locator('option[value="animal-kingdom"]');
    
    await expect(magicKingdom).toHaveCount(1);
    await expect(epcot).toHaveCount(1);
    await expect(hollywoodStudios).toHaveCount(1);
    await expect(animalKingdom).toHaveCount(1);
    
    // Verify option text
    await expect(magicKingdom).toHaveText('Magic Kingdom');
    await expect(epcot).toHaveText('EPCOT');
    await expect(hollywoodStudios).toHaveText('Hollywood Studios');
    await expect(animalKingdom).toHaveText('Animal Kingdom');
  });

  test('should allow adding and removing days', async ({ page }) => {
    // Initially should have 1 day
    let dateInputs = page.locator('input[type="date"]');
    expect(await dateInputs.count()).toBe(1);
    
    // Add a day
    await page.getByRole('button', { name: '+ Add Day' }).click();
    expect(await dateInputs.count()).toBe(2);
    
    // Add another day
    await page.getByRole('button', { name: '+ Add Day' }).click();
    expect(await dateInputs.count()).toBe(3);
    
    // Remove a day (should show delete buttons when more than 1 day)
    const deleteButtons = page.locator('button[aria-label="Remove day"]');
    expect(await deleteButtons.count()).toBe(3);
    await deleteButtons.first().click();
    expect(await dateInputs.count()).toBe(2);
  });

  test('should not show delete button when only one day exists', async ({ page }) => {
    const deleteButtons = page.locator('button[aria-label="Remove day"]');
    
    // Initially with 1 day, there should be no delete button
    // (Actually, the code shows delete buttons for all days when length > 1)
    expect(await deleteButtons.count()).toBe(0);
    
    // Add a day - now delete buttons should appear
    await page.getByRole('button', { name: '+ Add Day' }).click();
    expect(await deleteButtons.count()).toBe(2);
  });

  test('should show validation error for empty name', async ({ page }) => {    // Leave name empty, fill other fields
    await page.locator('input#email').fill('test@example.com');
    await page.locator('input[type="date"]').first().fill('2025-12-25');
    await page.locator('select').first().selectOption('magic-kingdom');
    
    // Try to submit
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show error under name field
    await expect(page.getByTestId('name-error')).toBeVisible();
    await expect(page.getByTestId('name-error')).toHaveText('Please enter your name');
  });

  test('should show validation error for empty email', async ({ page }) => {
    // Fill name and date/park, leave email empty
    await page.locator('input#name').fill('John Doe');
    await page.locator('input[type="date"]').first().fill('2025-12-25');
    await page.locator('select').first().selectOption('magic-kingdom');
    
    // Try to submit
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show error under email field
    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('email-error')).toHaveText('Please enter a valid email address');
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    // Fill name and invalid email
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('notanemail');
    await page.locator('input[type="date"]').first().fill('2025-12-25');
    await page.locator('select').first().selectOption('magic-kingdom');
    
    // Try to submit
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show error under email field
    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('email-error')).toHaveText('Please enter a valid email address');
  });

  test('should show validation error for incomplete date and park selection', async ({ page }) => {
    // Fill personal info
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('test@example.com');
    
    // Fill date but not park
    await page.locator('input[type="date"]').first().fill('2025-12-25');
    
    // Try to submit
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show error for days section
    await expect(page.getByTestId('days-error')).toBeVisible();
    await expect(page.getByTestId('days-error')).toHaveText('Please select both date and park for all days');
  });

  test('should display "What happens next" info box', async ({ page }) => {
    await expect(page.getByText('What happens next?')).toBeVisible();
    await expect(page.getByText(/monitor availability for your selected dates/i)).toBeVisible();
    await expect(page.getByText(/email notification when spots open up/i)).toBeVisible();
    await expect(page.getByText(/no payment required now/i)).toBeVisible();
  });

  test('should have Cancel button that returns to home', async ({ page }) => {
    const cancelButton = page.getByRole('button', { name: 'Cancel' });
    await expect(cancelButton).toBeVisible();
    
    await cancelButton.click();
    await page.waitForURL('/');
    expect(page.url()).toContain('/');
  });

  test('should have Submit button that is enabled when form is valid', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Join Waiting List' });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('should display darker text in input fields for readability', async ({ page }) => {
    // Check that inputs have text-gray-900 class for dark text
    const nameInput = page.locator('input#name');
    await expect(nameInput).toHaveClass(/text-gray-900/);
    
    const emailInput = page.locator('input#email');
    await expect(emailInput).toHaveClass(/text-gray-900/);
    
    const dateInput = page.locator('input[type="date"]').first();
    await expect(dateInput).toHaveClass(/text-gray-900/);
    
    const parkSelect = page.locator('select').first();
    await expect(parkSelect).toHaveClass(/text-gray-900/);
  });

  test('should show success message after valid form submission', async ({ page }) => {
    // Mock the API call
    await page.route('**/api/waiting-list', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Added to waiting list successfully' }),
      });
    });

    // Fill out the form
    await page.locator('input#name').fill('Jane Smith');
    await page.locator('input#email').fill('jane@example.com');
    await page.locator('input[type="date"]').first().fill('2025-12-30');
    await page.locator('select').first().selectOption('magic-kingdom');
    
    // Submit the form
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show success message
    await expect(page.getByText('Thank You!')).toBeVisible();
    await expect(page.getByText(/added to the waiting list/i)).toBeVisible();
  });

  test('should show error message when API call fails', async ({ page }) => {
    // Mock a failed API call
    await page.route('**/api/waiting-list', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to add to waiting list' }),
      });
    });

    // Fill out the form
    await page.locator('input#name').fill('Jane Smith');
    await page.locator('input#email').fill('jane@example.com');
    await page.locator('input[type="date"]').first().fill('2025-12-30');
    await page.locator('select').first().selectOption('epcot');
    
    // Submit the form
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Should show error message
    await expect(page.getByText('Failed to submit. Please try again.')).toBeVisible();
  });

  test('should disable submit button while submitting', async ({ page }) => {
    // Mock a slow API call
    await page.route('**/api/waiting-list', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill out the form
    await page.locator('input#name').fill('Test User');
    await page.locator('input#email').fill('test@test.com');
    await page.locator('input[type="date"]').first().fill('2025-12-28');
    await page.locator('select').first().selectOption('animal-kingdom');
    
    const submitButton = page.getByRole('button', { name: 'Join Waiting List' });
    await submitButton.click();
    
    // Button should show "Submitting..." and be disabled
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeDisabled();
  });

  test('should handle multiple days submission correctly', async ({ page }) => {
    // Mock the API call
    let requestBody: any;
    await page.route('**/api/waiting-list', async (route) => {
      requestBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill out form with multiple days
    await page.locator('input#name').fill('Multi Day User');
    await page.locator('input#email').fill('multiday@example.com');
    
    // First day
    await page.locator('input[type="date"]').first().fill('2025-12-25');
    await page.locator('select').first().selectOption('magic-kingdom');
    
    // Add second day
    await page.getByRole('button', { name: '+ Add Day' }).click();
    await page.locator('input[type="date"]').nth(1).fill('2025-12-26');
    await page.locator('select').nth(1).selectOption('epcot');
    
    // Add third day
    await page.getByRole('button', { name: '+ Add Day' }).click();
    await page.locator('input[type="date"]').nth(2).fill('2025-12-27');
    await page.locator('select').nth(2).selectOption('hollywood-studios');
    
    // Submit
    await page.getByRole('button', { name: 'Join Waiting List' }).click();
    
    // Wait for success
    await expect(page.getByText('Thank You!')).toBeVisible();
    
    // Verify the request had all 3 days
    expect(requestBody.days).toHaveLength(3);
    expect(requestBody.name).toBe('Multi Day User');
    expect(requestBody.email).toBe('multiday@example.com');
  });
});
