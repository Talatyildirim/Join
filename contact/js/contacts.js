let contacts = [];
let deleteContacts = [];
let alphabetics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

async function initContacts() {
    await downloadFromServer();
    await loadContacts();
    await includeHTML()
    renderContacts();
}


function createContact() {
    createNewContact();
    renderContacts();
}

/**
 * This function creates new contacts
 */
function createNewContact() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name')
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    document.getElementById('new-contact').classList.remove('show-overlay-menu')
    document.getElementById('dialog').classList.add('d-none');

    contacts.push({
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": phone.value,
        "color": getRandomColor(),
        "id": new Date().getTime()
    });

    saveUsers();
    deleteValue(firstName, lastName, email, phone);
}

/**
 * This function deletes the contacts
 */
function deleteContact(i) {
    const contact = contacts[i];
    document.getElementById('contact-data').innerHTML = '';
    document.getElementById('overlay-contact').innerHTML = '';

    deleteContacts.push(contact);

    contacts.splice(i, 1);

    renderContacts()
    saveUsers();
}


/**
 * This function renders the contacts
 */
function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';
    for (let index = 0; index < alphabetics.length; index++) {
        content.innerHTML += listTemplate(index);
    }
    for (let i = 0; i < contacts.length; i++) {
        let alphabet = contacts[i]['first-name'].charAt(0).toUpperCase();
        let alphabetContainer = document.getElementById(`${alphabet}-Contianer`);
        let contactContainer = document.getElementById(`${alphabet}`);
        contactRegister(alphabet, i, alphabetContainer, contactContainer);
    }

}

/**
 * This function is for the contact register
 */
function contactRegister(alphabet, i, alphabetContainer, contactContainer) {
    alphabetContainer.innerHTML += contactListHTML(contacts[i], i);
    contactContainer.style.display = "unset";
    document.getElementById(`letterbox-contact-div${i}`).style.backgroundColor = contacts[i]["color"];
}

/**
 * This function sorts alphabetically
 */
function sortAlphabetic() {
    contacts.sort((a, b) => {
        let fa = a['first-name'].toLowerCase(),
            fb = b['first-name'].toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}


/**
 * This function opens the contacts
 */
function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata, i);
    document.getElementById(`contact-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];

}

/**
 * This function opens the overlay contacts
 */
function openOverlayContact(i) {
    const contacoverlaytdata = contacts[i];
    document.getElementById('overlay-contact').innerHTML = contactDataOverlayHTML(contacoverlaytdata, i);
    document.getElementById(`contact-overlay-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];
}

/**
 * This function opens the contact editor
 */
function openEditContact(i) {
    const editcontactdata = contacts[i];
    document.getElementById('edit-contact').innerHTML = editContactDataHTML(editcontactdata, i);
    document.getElementById(`edit-name-token${i}`).style.backgroundColor = contacts[i]["color"];
    document.getElementById('dialog').classList.remove('d-none');
}

/**
 * this function is for editing contacts
 */
function editSave(i) {
    let firstName = document.getElementById(`edit-first-name${i}`);
    let lastName = document.getElementById(`edit-last-name${i}`)
    let email = document.getElementById(`edit-email${i}`);
    let phone = document.getElementById(`edit-phone${i}`);

    contacts[i]['first-name'] = firstName.value;
    contacts[i]['last-name'] = lastName.value;
    contacts[i]['email'] = email.value;
    contacts[i]['phone'] = phone.value;

    closeEdit();
    renderContacts();
    saveUsers();
    openContactData(i);
    openOverlayContact(i);
}

/**
 * This function closes the editor
 */
function closeEdit() {
    document.getElementById('edit-contact').innerHTML = '';
    document.getElementById('dialog').classList.add('d-none');
}

/**
 * This function closes the overlay
 */
function closedOverlay() {
    document.getElementById('overlay-contact').innerHTML = '';
}

/**
 * This function empties the input
 */
function deleteValue(firstName, lastName, email, phone) {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
}

/**
 * This function create the nav- and sidebar
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * This function generates the colors
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



/**
 * This function save contacts to the backend
 */
async function saveUsers() {
    await backend.setItem('contact', JSON.stringify(contacts));
}


/**
 * This function load contacts from the backend

 */
async function loadContacts() {
    contacts = JSON.parse(backend.getItem('contact')) || [];
}

/**
 * This function is for the popup
 */

function openPopup() {
    let popup = document.getElementById("popup-contact");
    popup.classList.remove("d-none");
    setTimeout(locateToContact, 1000);
}

function locateToContact() {
    let popup = document.getElementById("popup-contact");
    popup.classList.add("d-none");
    setTimeout(1000);
}


function contactListHTML(contact, i) {
    return /*html*/`
        <div class="contacts" id="contactss${i}">
        <img src="../img/Vector 10.png" class="contacts-div-line">
            <div class="letterbox" id="letterbox${i}" onclick="openContactData(${i}); openOverlayContact(${i})">
                <div class="latterbox-contact-div" id="letterbox-contact-div${i}">
                        ${contact['first-name'].charAt(0)}
                        ${contact['last-name'].charAt(0)}
                </div>
                <div class="openContact">
                    <span class="contactlist-name">
                        ${contact['first-name']}
                        ${contact['last-name']}
                    </span>
                    <a class="contactlist-email">
                        ${contact['email']}
                    </a>
                </div>
            </div>
        </div>
    `
}


function listTemplate(index) {
    return /*html*/`
       <div id="${alphabetics[index]}" style="display: none">
       <h2 class="contactHeadline">${alphabetics[index]}</h2>
       <div id="${alphabetics[index]}-Contianer" class="container"></div>
       </div>
       `;
}


function contactDataHTML(contactdata, i) {
    return /*html*/`
        <div class="contactdata"> 
            <div class="contact-first-last-name-div" id="contact-first-last-name-div${i}">
                    ${contactdata['first-name'].charAt(0)}
                    ${contactdata['last-name'].charAt(0)}
            </div>
                <span class="contact-data-name">
                    ${contactdata['first-name']}
                    ${contactdata['last-name']}
                </span>
                <div class="add-task-div">
                    <a href="../board/add-task.html"  class="add-task">
                    <img class="add-task-img" src="../img/Group 11.png">
                    Add Task</a>
                </div>
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <div class="edit-contact-button" onclick="openEditContact(${i})">
                        <img class="edit-contact-img" src="../img/Group 8.png">
                        <div class="edit-img-white">
                        <div class="edit-contact-img-white">
                            <img src="../img/Group8.png">
                        </div>
                        </div>
                        <span class="edit-name">Edit Contact</span>
                        </div>
                        <img src="../img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contactdata['email']}" class="contact-data-email">${contactdata['email']}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contactdata['phone']}" class="contact-data-phone">${contactdata['phone']}</a>
                    </div> 
        </div>
    `
}

function contactDataOverlayHTML(contacoverlaytdata, i) {
    return /*html*/`
    <div class="overlay-background-color">
    <img src="../img/Vector1.png" class="overlay-back" onclick="closedOverlay(${i})">
    <div class="contacts-div-box-name">
                <h3 class="contacts-name">Contacts</h3>
                <img class="contacts-name-img" src="../img/Vector 5.png">
                <h4 class="better-with">Better with a team</h4>
                <img class="contact-name-img" src="../img/Vector5.png">
            </div>
        <div class="overlay-contactdata"> 
            <div class="contact-first-last-name-div" id="contact-overlay-first-last-name-div${i}">
                    ${contacoverlaytdata['first-name'].charAt(0)}
                    ${contacoverlaytdata['last-name'].charAt(0)}
            </div>
                <span class="contact-data-name">
                    ${contacoverlaytdata['first-name']}
                    ${contacoverlaytdata['last-name']}
                </span>
                <div class="add-task-div">
                    <a href="../board/add-task.html"  class="add-task">
                    <img class="add-task-img" src="../img/Group 11.png">
                    Add Task</a>
                </div>
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <div class="edit-contact-button" onclick="openEditContact(${i})">
                        <img class="edit-contact-img" src="../img/Group 8.png">
                        <div class="edit-img-white">
                        <div class="edit-contact-img-white">
                            <img src="../img/Group8.png">
                        </div>
                        </div>
                        <span class="edit-name">Edit Contact</span>
                        </div>
                        <img src="../img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contacoverlaytdata['email']}" class="contact-data-email">${contacoverlaytdata['email']}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contacoverlaytdata['phone']}" class="contact-data-phone">${contacoverlaytdata['phone']}</a>
                    </div> 
        </div>
    </div>
    `
}


function editContactDataHTML(editcontactdata, i) {
    return /*html*/`
<div id="dialog" class="dialog-gb d-none">
    <div class="edit-box" id="edit-box">
        <img src="../img/Vector.png" class="close-x" onclick="closeEdit()">
        <img src="../img/Group11.png" class="closed-x" onclick="closeEdit()">
        <div class="edit-box-left">
            <img src="../img/Capa.png" class="join-img">
            <h2 class="edit-contact-name">Edit contact</h2>
            <img class="overlay-line" src="../img/Vector5.png">
        </div>
        <div class="edit-name-token" id="edit-name-token${i}">
                ${editcontactdata['first-name'].charAt(0)}
                ${editcontactdata['last-name'].charAt(0)}
        </div>
        <div class="edit-input-field" id="edit-input-field">
            <div class="edit-input-div">
                <div>
                    <input class="edit-input" id="edit-first-name${i}" value="${editcontactdata['first-name']}" placeholder="First-Name" type="text">
                    <img src="../img/Vector-name.png" class="overlay-input-edit-first-name-img">
                </div>
                <div>
                    <input class="edit-input" id="edit-last-name${i}" value="${editcontactdata['last-name']}" placeholder="Last-Name" type="text">
                    <img src="../img/Vector-name.png" class="overlay-input-edit-last-name-img">
                </div>
                <div>
                    <input class="edit-input" id="edit-email${i}" value="${editcontactdata['email']}" placeholder="Email" type="email">
                    <img src="../img/Vector-email.png" class="overlay-edit-input-email-img">
                </div>
                <div>
                    <input class="edit-input" id="edit-phone${i}" value="${editcontactdata['phone']}" placeholder="Phone" type="number">
                    <img src="../img/Vector-phone.png" class="overlay-edit-input-phone-img">
                </div>
            </div>
            <button class="edit-save" id="edit-save" onclick="editSave(${i})">
                <h3 class="edit-save-button">Save</h3>
            </button>
        </div>
    </div>
</div>
    `
}