let toggleBtn = document.querySelector("#mobile__header__nav_bar_toggle_btn");
let sideBar = document.querySelector("#side_bar");
toggleBtn.addEventListener("click", onToggleSidebarBtn);
function onToggleSidebarBtn() {
  toggleBtn.classList.toggle("btn_toggled");
  sideBar.classList.toggle("mobile__toggled_menu");
  toggleBtn.parentElement
    .querySelector(".mobile__header__brand")
    .classList.toggle("mobile__toggled_menu");
}
