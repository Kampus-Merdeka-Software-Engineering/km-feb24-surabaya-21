// JavaScript to close the navbar when a link is clicked
document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('#nav-list li a');
    const checkbox = document.getElementById('check');
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        checkbox.checked = false;
      });
    });
  });
  