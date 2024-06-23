import { test, expect} from '@playwright/test';
import { enums } from '../../utils/enums';

const {
    knownCategories
} = enums

test.describe('Im going to test one of the chuck norris endpoint, I selected the categories endpoint', () => {
    
    test('Should return a 200 status code', async ({ request }) => {
        const response = await request.get(``);
        expect(response.status()).toBe(200);
      });
    
    test('Should return an array of categories and should not be empty', async ({ request }) => {
        const response = await request.get(``);
        const data = await response.json();
        await expect(Array.isArray(data)).toBe(true)
        await expect(data.length).not.toBe(0);
    });
    
    test('Should contain unique categories', async ({ request }) => {
        const response = await request.get(``);
        const data = await response.json();
        const uniqueCategories = new Set(data);
        await expect(uniqueCategories.size).toEqual(data.length);
    });
    
    test('hould include all known categories', async ({ request }) => {
        const response = await request.get(``);
        const data = await response.json();
        knownCategories.forEach(category => {
          expect(data).toContain(category);
        });
    });

    test('Should not include other type of category', async ({ request }) => {
        const response = await request.get(``);
        const data = await response.json();
        await expect(data).not.toContain('politics');
    });
});
