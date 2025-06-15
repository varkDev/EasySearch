const toggleBtn = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.smartquery-dropdown');

toggleBtn.addEventListener('click', () => {
  dropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});
