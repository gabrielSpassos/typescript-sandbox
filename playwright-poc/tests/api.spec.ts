import { test, expect } from '@playwright/test';

test('should call api', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.id).toBe(1);
});