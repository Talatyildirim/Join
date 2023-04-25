let sidebarLinks = document.querySelectorAll(".each-sidebar-link");
let sidebarIcons = document.querySelectorAll(".sidebar-icon");

sidebarLinks.forEach((eachLink) => {
  console.log(eachLink);
  eachLink.addEventListener("click", () => {
    if(window.location.href = "../summary/homepage.html") {
      
    }
    let unactiveLink = document.querySelector(".sidebar-links.active");
    unactiveLink.classList.remove("active");
    eachLink.classList.add("active");

    let mutedIcon = unactiveLink.getElementsByTagName("path");
    let mutedCircleIcon = unactiveLink.getElementsByTagName("circle");
    mutedIconFunc(mutedIcon);
    mutedCircleIconFunc(mutedCircleIcon);

    let activeIcon = eachLink.getElementsByTagName("path");
    let activeCircleIcon = eachLink.getElementsByTagName("circle");
    activeIconFunc(activeIcon);
    activeCircleIconFunc(activeCircleIcon);

  });
});

function mutedIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.fill = "#CDCDCD";
  }
}

function mutedCircleIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.stroke = "#CDCDCD";
  }
}

function activeIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.fill = "white";
  }
}

function activeCircleIconFunc(icon) {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.stroke = "white";
  }
}

function showLogOut() {
  let list = document.getElementById("log-out");
  if (window.innerWidth <= 872) {
    list.classList.remove("show-log-out");
    list.classList.toggle("log-out-for-mobile");
  } else if (window.innerWidth >= 872) {
    list.classList.remove("log-out-for-mobile");
    list.classList.toggle("show-log-out");
  }
}

function btn1() {
document.getElementById(`btn1${i}`).classList.add('sidebar-links-list-onklick')
}
