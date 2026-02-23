function sendEmail(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    
    var mailtoLink = 'mailto:xandertech777@gmail.com?subject=Contact from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\n\nMessage:\n' + message);
    
    window.location.href = mailtoLink;
    document.getElementById('contactForm').reset();
}
