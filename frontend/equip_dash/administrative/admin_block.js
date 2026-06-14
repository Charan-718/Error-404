
document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', function() {
    const dropdownContent = this.nextElementSibling;
    this.classList.toggle('active');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';


    if (dropdownContent.style.maxHeight) {
      dropdownContent.style.maxHeight = null;
    } else {
      dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
    }
  });
});


window.addEventListener('load', function() {
  document.querySelector('.main-content').classList.add('show');
});
