document.addEventListener("DOMContentLoaded", async () => {
  /**
   * Fetches HTML content from a URL and injects it into a specified element.
   * @param {string} selector - The CSS selector for the target element (e.g., '#header-placeholder').
   * @param {string} url - The URL of the HTML file to load.
   */
  const loadHTML = async (selector, url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      const data = await response.text();
      const element = document.querySelector(selector);
      if (element) element.innerHTML = data;
    } catch (error) {
      console.error(`Error loading content for ${selector}:`, error);
    }
  };

  await loadHTML("#header-placeholder", "header.html");

  // Mobile Menu Logic
  const header = document.querySelector('header');
  if (header) {
    const container = header.querySelector('.container');
    const nav = header.querySelector('.desktop-nav');

    if (container && nav) {
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger-menu';
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      container.appendChild(hamburger);

      const closeBtn = document.createElement('div');
      closeBtn.className = 'close-menu';
      closeBtn.innerHTML = '&times;';
      nav.prepend(closeBtn);

      hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
      });

      closeBtn.addEventListener('click', () => {
        nav.classList.remove('active');
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('active'));
      });
    }
  }

  loadHTML("#footer-placeholder", "footer.html");
});