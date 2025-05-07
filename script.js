function showSection(sectionId) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('forgot-password-container').style.display = 'none';
    document.getElementById('send-code-container').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}
