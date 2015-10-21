(function () {
  var modals = document.querySelectorAll(".modal");
  if (modals.length > 0) {
    
    for (var i=0; i<modals.length; i++) {
      initModal(modals[i]);
    }
    
    function initModal(modal) {
      var closeButtons = modal.querySelectorAll(".button");
      
      for (var i=0; i<closeButtons.length; i++) {
        initButton(closeButtons[i]);
      }
            
      function initButton (button) {
        button.addEventListener("click", function(event) {
          event.preventDefault();
          modal.classList.toggle("modal--show");
        })
      }
    }
  }
})();