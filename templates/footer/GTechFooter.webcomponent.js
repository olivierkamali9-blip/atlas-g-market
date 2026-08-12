/**
 * Web Component Universel : Footer "Powered by G-Tech"
 * Utilisable dans tous les projets Web (HTML pur, React, Vue, Svelte, Angular)
 */
class GTechFooterElement extends HTMLElement {
  connectedCallback() {
    const appName = this.getAttribute('app-name') || 'G-Tech App';
    const year = this.getAttribute('year') || '2026';

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #0F172A;
          color: #94A3B8;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 14px;
          border-top: 1px solid #1E293B;
          box-sizing: border-box;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .footer-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #F8FAFC;
          font-weight: 600;
        }
        .brand span {
          color: #38BDF8;
        }
        .links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .links a {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .links a:hover {
          color: #38BDF8;
        }
        .copyright {
          font-size: 13px;
          color: #64748B;
        }
      </style>
      <footer class="footer-container">
        <div class="brand">
          <span>${appName}</span> — Powered by G-Tech HQ
        </div>
        <div class="links">
          <a href="/privacy">Confidentialité</a>
          <a href="/terms">CGU</a>
          <a href="/compliance">Conformité</a>
        </div>
        <div class="copyright">
          © ${year} G-Tech HQ. Tous droits réservés.
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('gtech-footer')) {
  customElements.define('gtech-footer', GTechFooterElement);
}