function includeHTML() {
  const elements = document.querySelectorAll('[w3-include-html]');
  elements.forEach(el => {
    const file = el.getAttribute('w3-include-html');
    fetch(file)
      .then(resp => {
        if (!resp.ok) throw new Error('Page not found');
        return resp.text();
      })
      .then(data => {
        el.innerHTML = data;
        el.removeAttribute('w3-include-html');
        includeHTML(); // Recursively include nested files
      })
      .catch(err => {
        el.innerHTML = "Failed to load: " + file;
      });
  });
}