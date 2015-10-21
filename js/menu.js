(function(){

  var menuToggle = document.querySelector(".main-navigation__toggle");
  var menuItems = document.querySelectorAll(".main-navigation__item");

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    menuToggle.classList.toggle("main-navigation__toggle--close");

    for (var i = 0; i < menuItems.length; i++) {
      var menuItem = menuItems[i];

      if (!menuItem.classList.contains("main-navigation__item--logo")) {
        menuItem.classList.toggle("main-navigation__item--hidden");
      }
    }
  })

})();
