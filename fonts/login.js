let loadedContacts=[]
let users=[]

/**
 *function for moving the start-logo from center to left corner 
 */
function moveLogo() {
  let logo = document.getElementById("start-pic");
  backgroundOpacity();
  logo.classList.remove("logo-big");
  logo.classList.add("logo-small");
  showLogin();
  setTimeout(removeStartbackground,100)
}

/**
 * function for undisplay the startbackground by adding class
 */
function removeStartbackground(){
    document.getElementById("start-background").classList.add("d-none");
}

/**
 * function to change background-opacity bei class-change
 */
function backgroundOpacity(){
    let bg = document.getElementById("start-background");
    bg.classList.remove("start");
    bg.classList.add("stop");
}

/**
 *function to wait some time before moving logo and getting login-box 
 */
async function getLogin() {
  setTimeout(moveLogo, 500)
  getUsers();
  console.log(users);
}


/**
 * funtion to set Location of Storage 
 */
 setURL(
  "https://talat-yildirim.developerakademie.net/join/smallest_backend_ever"
);

/**
 * function for showing the login-box and sign-in 
 */
function showLogin() {
  document.getElementById("login-container").classList.remove("d-none");
  document.getElementById("newuser-container").classList.remove("d-none");
}


async function getCurrentUser() {
  let logname = document.getElementById("mail-login");
  let logpassword = document.getElementById("password-login");
  console.log(logname, logpassword);
  let usersFromBackend = JSON.parse(backend.getItem("users")) || [];
  console.log(usersFromBackend);
  let current_user = usersFromBackend.find(
    (u) => u.password == logpassword.value && u.email == logname.value
  );

  console.log(current_user);
  if (!current_user) {
    tryOneMore();
  } else {
   // setCurrentUserToLocal(current_user);
   // deleteRemember();
   // checkRemember(logname.value,logpassword.value);
    window.location.href = "../summary/homepage.html";
  }
}



/**function to reset value of loginfields */
function resetLogin(){
  document.getElementById("email-login").value="";
  document.getElementById("password-login").value="";

}

/**
 * function to storage current User local 
 
function setCurrentUserToLocal(currentUser) {
  let currentUserAsText = JSON.stringify(currentUser);
  localStorage.setItem("current_user", currentUserAsText);
  console.log(currentUser["username"]);
}*/

/**
 * function to login a guestUser 
 */
function guestLogin() {
  current_user = {
    username: "Guest",
    email: "guest@guest.de",
    color:"grey"
  };
  setCurrentUserToLocal(current_user);
  getDemoSummary();
}


/**
 * function to get the summary as guest 
 */
function getDemoSummary() {
  window.location.href = "../summary/homepage.html";
}

/**
 * function to set a new user to local store
 * @param {string} newUser -Parameter is name of user,who wants to registrate
 */
function setJustRegistratedToSessStore(newUser){
  sessionStorage.setItem("just_reg_email",newUser["email"]);
  sessionStorage.setItem("just_reg_pw",newUser["password"]);
}


function removeJustRegistrated(){
  sessionStorage.removeItem("just_reg_email");
  sessionStorage.removeItem("just_reg_pw");
}


function getJustRegistratedEmail(){
  let email=sessionStorage.getItem("just_reg_email");
  return email
}


function getJustRegistratedPW(){
  let pw=sessionStorage.getItem("just_reg_pw");
  return pw
}

    

/**
 * function checks if new user is already in contacts
 * @param {string} newUser -Parameter is name of registrating user
 * @returns {boolean} - true if user is not in contacts yet
 */
async function checkifContact(newUser) {
    let isNewContact = true;
    for (let i = 0; i < loadedContacts.length; i++) {
      if (
        newUser["email"] == loadedContacts[i]["email"]
      ) {
        isNewContact = false;
        console.log("is Contact");
        break;
      }
    }
    return isNewContact;
  }


/**
 * functions creates a contact from userdates
 * @param {string} newUser - Parameter is name of registrating user
 */
async function createNewContactFromUser(newUser) {
    let newName = newUser["username"];
    let newMail = newUser["email"];
    let newPhone="";
    let color = newUser["color"];
    let newObjekt = { name: newName, email: newMail, phone: newPhone, color: color};
    loadedContacts.push(newObjekt);
    await saveContactsToBackend();
}


/**
 * function creates a random color to new user
 */

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
*function to change classname of popup 
*/
function popupPassChange(){
    let popup = document.getElementById("popup-pw");
    popup.classList.remove("d-none");
    setTimeout(changeClass2, 100);
}


/**
*function to change classname of popup 
*/
function changeClass2() {
    let popup_p = document.getElementById("popup-pw-p");
    popup_p.classList.remove("bottom");
    popup_p.classList.add("center");
    setTimeout(locateToLogin, 3000);
  }


/**
*function to change classname of popup 
*/
function changeClass() {
  let popup_p = document.getElementById("popup-mail-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(newPassword, 3000);
}

/**
 * common functions
 */

/**functions to change window */
function locateToLogin() {
  window.location.href = "./login.html";
}


/**function to change window */
function locateToSignin() {
  window.location.href = "./registrieren.html";
}


/**function to count on session Storage*/
function getNumberOfTry(){
  let tryNumber=sessionStorage.getItem("trynumber");
  if (tryNumber){
  return tryNumber}
  else{
    return 0
  }
}


/**function to count Trys of Login */
function tryOneMore(){
  let n=getNumberOfTry();
  n++;
  if(n<3){
  sessionStorage.setItem("trynumber",n);
  passwordWrong();
  /*openInfoTrysOneMore()*/
}else{
  removeTrys();
  openInfoTrys();
}
}


/**
 * functions to give warning about trys 
 */
 function openInfoTrys(){
  let popup=document.getElementById("popup-trys");
  popup.classList.remove("d-none");
  setTimeout(locateToSignin,1000)
}


function openInfoTrysOneMore(){
  let popup=document.getElementById("popup-try-again");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin,1000);
}


function removeTrys(){
  sessionStorage.removeItem("trynumber");
}


/**
 * functions for remember me 
 */

function checkRemember(logname,logpassword){
  if (document.getElementById("rememberme").checked==true){
    setRemember(logname,logpassword);
  }
  }


  function setRemember(logname,logpassword){
    localStorage.setItem("current_logname",logname);
    localStorage.setItem("current_password",logpassword);
  }


  function getRememberName(){
    return localStorage.getItem("current_logname");
  }


  function getRememberPW(){
   return localStorage.getItem("current_password");
  }


  function deleteRemember(){
      localStorage.removeItem("current_logname");
      localStorage.removeItem("current_password");
  }


  function rememberToForm(){
    let namevalue=getRememberName();
    let pwvalue=getRememberPW();
    if(getRememberName()){
      document.getElementById("mail-login").value=namevalue;
      document.getElementById("password-login").value=pwvalue;
    }
  }


  /**functions for password-field */

  /**
   * functions for toggle value of password-input
   * @param {string} id -parameter is id of input-field
   * @param {string} id_pic -parameter is id of img in input-field
   */
    function getValueLogin(id,id_pic){
    changePic(id,id_pic);
    checkValuePic();
    
  }

  

  function setTypePassword(id,id_pic){
    let eye=document.getElementById(id_pic).getAttribute("src");
    if (eye=="../img/Schloß.png"){
        document.getElementById(id).setAttribute("type","text");
    }else{
      document.getElementById(id).setAttribute("type","password")
    }
  }

  function checkValuePic(){
    let eye=document.getElementById("eyelock").getAttribute("src");
    if(eye=="../img/Schloß.png"){
      renderValueLogin();
    }
  }

  function cleanLogin(id1,id2,id3=""){
    document.getElementById(id1).value="";
    document.getElementById(id2).value="";
    if(id3){
      document.getElementById(id3).value="";
    }
  }

  function renderValueLogin(){
    let name=getRememberName();
    let pw=getRememberPW();
    if(name && isNoValue()){
      document.getElementById("mail-login").value=name;
      document.getElementById("password-login").value=pw;
    }
  }

  function isNoValue(){
    if( document.getElementById("mail-login").value=="" ||
    document.getElementById("password-login").value==""){
      return true
    }
  }


  function passwordWrong(){
    let info=document.getElementById("new-password");
    info.innerHTML="Passwort falsch";
    info.style.color="red";
    info.onclick = onclickReaction(false);
    setTimeout(cleanPassword,1000)
  }


  function cleanPassword(){
    document.getElementById("password-login").value="";
    let info=document.getElementById("new-password");
    info.innerHTML="Passwort vergessen";
    info.style.color="rgb(40, 171, 226)";
    info.onclick = onclickReaction(true);
  }
  

  function onclickReaction(react){
        return react;
  }

  
  function showWarnPW(){
    document.getElementById("confirm-info").classList.remove("d-none");
  }


  function clearWarn(){
    document.getElementById("confirm-info").classList.add("d-none");
    cleanLogin("reseted-password","reseted-password2");
  }

  


 


  

