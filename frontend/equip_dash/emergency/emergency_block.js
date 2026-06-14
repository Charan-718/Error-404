// Add event listeners to dropdown buttons
document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', function() {
    const dropdownContent = this.nextElementSibling;
    this.classList.toggle('active');

    // Toggle the dropdown content's visibility
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

    // Slide effect
    if (dropdownContent.style.maxHeight) {
      dropdownContent.style.maxHeight = null;
    } else {
      dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
    }
  });
});

// Trigger animation for main content on load
window.addEventListener('load', function() {
  document.querySelector('.main-content').classList.add('show');
});
