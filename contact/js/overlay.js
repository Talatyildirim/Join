function openNewContact() {
    document.getElementById('new-contact').classList.add('show-overlay-menu');
}

function closeOverlay() {
    document.getElementById('new-contact').classList.remove('show-overlay-menu');
    document.getElementById('dialog').classList.add('d-none');
    
}

function openDialog() {
    document.getElementById('dialog').classList.remove('d-none');
}