function initializeSideBar(sidebarId, debug = false) {
  let currentMenuName = "";
  function onMenuIconItemClick(target) {
    if (!target.target.classList.contains("icon_men")) return;
    let menuIconClicked = target.target;
    let menuName = menuIconClicked.getAttribute("menuName");
    if (debug) console.log(`Clicking '${menuName}'`);

    if (menuName == currentMenuName || !sidebar.classList.contains("toggled"))
      onToggleBtnClick();
    if (menuName == currentMenuName) return;
    if (!showMenu(menuName)) return;
    menuIconClicked.classList.add("selected");
  }
  function onToggleBtnClick() {
    sidebar.classList.toggle("toggled");
  }
  function showMenu(menuName) {
    let menuToShow = document.querySelector(
      `.side_bar__content__menu[menuFor=${menuName}]`
    );
    if (!menuToShow) {
      if (debug) console.log(`${menuName} menu not found`);
      return false;
    }

    let allMenus = document.querySelectorAll(".side_bar__content__menu");
    [...allMenus].forEach((menu) => {
      menu.classList.remove("open");
    });
    let allIconMenus = document.querySelectorAll(".icon_men");
    [...allIconMenus].forEach((menu) => {
      menu.classList.remove("selected");
    });

    menuToShow.classList.add("open");
    currentMenuName = menuName;
    return true;
  }

  let sidebar = document.getElementById(sidebarId);
  if (!sidebar) throw new Error(`SideBar with id '${sidebarId}' not found`);
  let sidebarIconsMenu = sidebar.querySelector(".side_bar__icons_bar__menu");
  if (!sidebarIconsMenu)
    throw new Error(
      `SideBar icons menu with className side_bar__icons_bar__menu not found`
    );

  if (debug) console.log("Side bar initialized successfully");
  sidebarIconsMenu.addEventListener("click", onMenuIconItemClick);
}
