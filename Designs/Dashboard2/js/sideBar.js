function initializeSideBar(sidebarId, debug = false) {
  let currentMenuName = "";
  function onMenuIconItemClick(target) {
    if (!target.target.parentElement.classList.contains("icon_menu")) return;
    let menuIconClicked = target.target.parentElement;
    console.log(menuIconClicked);
    let menuName = menuIconClicked.getAttribute("menuName");
    if (debug) console.log(`Clicking '${menuName}'`);

    if (menuName == currentMenuName || !sidebar.classList.contains("toggled"))
      sidebar.classList.toggle("toggled");
    if (menuName == currentMenuName) return;
    if (!showMenu(menuName)) return;
    menuIconClicked.classList.add("selected");
  }
  function onToggleBtnClick() {
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("toggled"))
      sidebar.classList.remove("toggled");
  }
  function showMenu(menuName) {
    let menuToShow = document.querySelector(
      `.side_bar__content__menu[menuFor=${menuName}]`
    );
    menu_title.innerText = menuToShow.getAttribute("menu-options-title");
    if (!menuToShow) {
      if (debug) console.log(`${menuName} menu not found`);
      return false;
    }

    let allMenus = document.querySelectorAll(".side_bar__content__menu");
    [...allMenus].forEach((menu) => {
      menu.classList.remove("open");
    });
    let allIconMenus = document.querySelectorAll(".icon_menu");
    [...allIconMenus].forEach((menu) => {
      menu.classList.remove("selected");
    });

    menuToShow.classList.add("open");
    currentMenuName = menuName;
    return true;
  }
  function onSearchOption(event) {
    var value = event.target.value;
    var all_options = document.querySelectorAll(
      ".menus .side_bar__content__menu__option"
    );
    var result__container = document.getElementById("options__search__result");
    result__container.innerHTML = "";
    if (value)
      [...all_options].forEach((option) => {
        if (
          option.firstElementChild.innerText
            .toLowerCase()
            .includes(value.toLowerCase()) > -1 &&
          !option.getAttribute("submenusname")
        )
          result__container.innerHTML += option.outerHTML;
      });
  }
  function onClickOnMenuContainerHandler(event) {
    let element = event.target;
    isChildren = element.getAttribute("childof");
    isSubMenuParent = element.getAttribute("submenusname");

    if (!isSubMenuParent) {
      return;
    }

    function closeChilds(element_parent) {
      var parent_name = element_parent.getAttribute("submenusname");
      let allChildrens = document.querySelectorAll(
        `li[childof=${parent_name}]`
      );
      [...allChildrens].forEach((child) => {
        child.classList.remove("submenu__open");
        if (child.getAttribute("submenusname")) closeChilds(child);
      });
      element_parent.classList.remove("submenu__parent__selected");
    }
    function openChilds(element_parent) {
      var parent_name = element_parent.getAttribute("submenusname");
      let allChildrens = document.querySelectorAll(
        `li[childof=${parent_name}]`
      );
      [...allChildrens].forEach((child) => {
        child.classList.add("submenu__open");
      });
      element_parent.classList.add("submenu__parent__selected");
    }
    if (element.classList.contains("submenu__parent__selected")) {
      closeChilds(element);
      return;
    }
    openChilds(element);
  }

  let sidebar = document.getElementById(sidebarId);
  if (!sidebar) throw new Error(`SideBar with id '${sidebarId}' not found`);
  let sidebarIconsMenu = sidebar.querySelector(".side_bar__icons_bar__menu");
  if (!sidebarIconsMenu)
    throw new Error(
      `SideBar icons menu with className side_bar__icons_bar__menu not found`
    );
  let sidebarToggleBtn = document.querySelector(".side_bar__toggle_btn");
  if (!sidebarToggleBtn)
    throw new Error(
      `SideBar Toggle button  with className side_bar__toggle_btn not found`
    );
  let menu_title = document.querySelector(".side_bar__content__title");
  if (!sidebarToggleBtn)
    throw new Error(
      `SideBar Menu Title with className side_bar__content__title not found`
    );
  let search_options_input = document.querySelector(".search__options__input");
  if (!search_options_input)
    throw new Error(`input with search__options__input class not found`);
  let menus_container = document.querySelector(".side_bar__menus .menus");
  if (!menus_container) throw new Error(`menus container missed!!`);
  if (debug) console.log("Side bar initialized successfully");
  sidebarIconsMenu.addEventListener("click", onMenuIconItemClick);
  sidebarToggleBtn.addEventListener("click", onToggleBtnClick);
  document
    .getElementsByTagName("body")[0]
    .addEventListener("swiped-right", function () {
      try {
        onToggleBtnClick();
      } catch (error) {
        console.log(error);
      }
    });
  sidebar.addEventListener("swiped-left", function () {
    try {
      onToggleBtnClick();
    } catch (error) {
      console.log(error);
    }
  });
  search_options_input.addEventListener("keyup", onSearchOption);
  menus_container.addEventListener("click", onClickOnMenuContainerHandler);
}
