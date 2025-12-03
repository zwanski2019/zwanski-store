// Simple GDPR-compliant cookie consent
// Place this in js/cookieconsent.js and reference in all pages

document.addEventListener('DOMContentLoaded', function () {
  if (!localStorage.getItem('cookieConsent')) {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <img src="assets/icons/cookie.svg" alt="Cookie Icon" />
        <span>
          Zwanski Tech uses cookies for essential site functions, analytics, and limited marketing. 
          <a href="cookie-policy.html">Learn more</a>.
        </span>
        <button id="accept-cookies">Accept</button>
        <button id="decline-cookies">Decline</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').onclick = function () {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
    };
    document.getElementById('decline-cookies').onclick = function () {
      localStorage.setItem('cookieConsent', 'declined');
      // Optionally block non-essential scripts here
      banner.remove();
    };
  }
});
