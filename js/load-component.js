document.addEventListener('DOMContentLoaded', function () {

  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      document.dispatchEvent(new Event('headerLoaded'));
    })
    .catch(error => console.log('Error loading header:', error));

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
      document.dispatchEvent(new Event('footerLoaded'));
    })
    .catch(error => console.log('Error loading footer:', error));

});
