document.getElementById('smartquery-go').addEventListener('click', () => {
  const query = document.getElementById('smartquery-input').value.trim();
  if (!query) {
    alert('Please enter a search query.');
    return;
  }

  const filetypes = Array.from(document.querySelectorAll('input[name="filetype"]:checked')).map(input => input.value);
  const siteInput = document.getElementById('site-input').value.trim();
  const sites = siteInput
    ? siteInput.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  let finalQuery = query;

  if (filetypes.length === 1) {
    finalQuery += ` filetype:${filetypes[0]}`;
  } else if (filetypes.length > 1) {
    const ftQuery = filetypes.map(ft => `filetype:${ft}`).join(' OR ');
    finalQuery += ` (${ftQuery})`;
  }

  if (sites.length === 1) {
    finalQuery += ` site:${sites[0]}`;
  } else if (sites.length > 1) {
    const siteQuery = sites.map(site => `site:${site}`).join(' OR ');
    finalQuery += ` (${siteQuery})`;
  }

  document.getElementById('smartquery-output').innerText = finalQuery;
});

// Copy button: silently copy to clipboard
document.getElementById('copy-btn').addEventListener('click', () => {
  const outputText = document.getElementById('smartquery-output').innerText;
  if (!outputText) return;
  navigator.clipboard.writeText(outputText).catch(() => {});
});

// Open Google search in new tab
document.getElementById('open-btn').addEventListener('click', () => {
  const query = document.getElementById('smartquery-output').innerText;
  if (!query) return;
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
});
