(function(){

  var menuItems = document.querySelectorAll(".main-navigation__item");
  
  if (menuItems.length > 0) {
    var menuToggle = document.querySelector(".main-navigation__toggle");
    
    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      menuToggle.classList.toggle("main-navigation__toggle--close");

      for (var i = 0; i < menuItems.length; i++) {        
        initMenuItem(menuItems[i]);
      }
    });
  }
  
  function initMenuItem(item) {
    if (!item.classList.contains("main-navigation__item--logo")) {
      item.classList.toggle("main-navigation__item--hidden");
    }
  }
})();
