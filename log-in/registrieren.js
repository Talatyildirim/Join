setURL(
  "https://talat-yildirim.developerakademie.net/join/smallest_backend_ever"
);

/**
 * function to get all registrated Users and Contacts from storage
 */

async function getUsers() {
  await downloadFromServer();
}

/**
 * function to registrate as new User
 */
async function sign() {
  let users = (await JSON.parse(backend.getItem("users"))) || [];
  let name = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  if (checknewUser(users, email.value)) {
    await savenewUser(users, newUser);
    cleanValue(username, email, password);
    window.location.href = "./login.html";
  } else {
    openPopup();
  }
}

function openPopup() {
  let popup = document.getElementById("popup-user");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin, 2000);
}

function locateToLogin() {
  window.location.href = "./login.html";
}

function cleanValue(username, email, password) {
  username = "";
  email = "";
  password = "";
}

/**
 * function checks if user, who wants to registrate, is new
 * @param {string} newUser -Parameter is name of user,who wants to registrate
 * @returns {boolean} -true if user is new
 */
function checknewUser(users, email) {
  let checkUser;
  if (users.length == 0) {
    checkUser = true;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["email"] == email) {
        checkUser = false;
        return checkUser;
      } else {
        checkUser = true;
      }
    }
  }
  return checkUser;
}

/**
 * functions to save users to backend from here
 */

async function savenewUser(users, newUser) {
  users.push(newUser);
  await backend.setItem("users", JSON.stringify(users));
}