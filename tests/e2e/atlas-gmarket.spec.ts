import { test, expect } from '@playwright/test';

test.describe('Atlas G-market - Parcours E2E complet', () => {
  test('Publication d\'une offre, Recherche par filtre et Prise de contact', async ({ page, browser }) => {
    // 1. Authentification & Publication de l'annonce par l'offreur
    await page.goto('/login');
    await page.fill('input[name="email"]', 'vendeur@g-tech.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await page.click('text=Publier une annonce');
    await page.fill('input[name="title"]', 'Développeur Fullstack React/Node - Freelance');
    await page.selectOption('select[name="category"]', 'Emploi & Services');
    await page.fill('textarea[name="description"]', 'Mission immédiate sur le projet Atlas G-market.');
    await page.fill('input[name="price"]', '450');
    await page.selectOption('select[name="type"]', 'Offre');
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast-success')).toContainText('Annonce publiée avec succès');

    // 2. Navigation, Recherche & Filtrage par le demandeur (session distincte)
    const buyerContext = await browser.newContext();
    const buyerPage = await buyerContext.newPage();

    await buyerPage.goto('/login');
    await buyerPage.fill('input[name="email"]', 'acheteur@g-tech.com');
    await buyerPage.fill('input[name="password"]', 'Password123!');
    await buyerPage.click('button[type="submit"]');

    await buyerPage.goto('/search');
    await buyerPage.fill('input[placeholder*="Que cherchez-vous"]', 'Développeur Fullstack');
    await buyerPage.selectOption('select[name="category"]', 'Emploi & Services');
    await buyerPage.click('button:has-text("Rechercher")');

    const firstCard = buyerPage.locator('.ad-card').first();
    await expect(firstCard).toContainText('Développeur Fullstack React/Node');
    await firstCard.click();

    // 3. Mise en relation / Prise de contact
    await buyerPage.click('button:has-text("Contacter")');
    await buyerPage.fill('textarea[name="message"]', 'Bonjour, l\'offre est-elle toujours disponible ?');
    await buyerPage.click('button:has-text("Envoyer")');

    await expect(buyerPage.locator('.chat-messages')).toContainText('Bonjour, l\'offre est-elle toujours disponible ?');
  });
});