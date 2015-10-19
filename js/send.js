(function() {
  
  if (!("FormData" in window)) {
    return;
  }
  
  var form = document.querySelector(".review-form");
  
  var allModals = document.querySelectorAll(".modal");  
  for (var i=0; i<allModals.length; i++) {
    var modal = allModals[i];
    
    modal.querySelector(".button").addEventListener("click", function(event) {
      event.preventDefault();
      modal.classList.toggle("modal--show");
    });
  }
  
  var errorModal = document.querySelector("#errorModal");
  var successModal = document.querySelector("#successModal");
  
  var queue = [];
  
  form.querySelector("#choosePhotos").addEventListener("change", function(event) {
    var files = this.files;
    
    for (var i=0; i<files.length; i++) {
      preview(files[i]);
    }
  });
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    var data = new FormData(form);
    
    queue.forEach(function(element) {
        data.append("images", element.file);
    });
    
    request(data, "https://echo.htmlacademy.ru/adaptive", function(response) {
      console.log(response);

      successModal.classList.toggle("modal--show");
    });
  });
  
  function request(data, url, callback_func) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    var sendUrl = url + "?" +time;
    
    xhr.open("post", sendUrl);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        callback_func(xhr.responseText);
      }
    });
    
    xhr.send(data);
  }
  
  var area = form.querySelector(".gallery__list");
  var template = document.querySelector("#gallery-image-template").innerHTML;
  
  
  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(template, {
        "image": event.target.result,
        "name": file.name
      });
      
      var li = document.createElement("li");
      li.classList.add("gallery__item");
      li.innerHTML = html;
      
      area.appendChild(li);
      
      li.querySelector(".gallery__remove-item-link").addEventListener("click", function(event) {
        event.preventDefault();
        removePreview(li);
      });
      
      queue.push({"file": file, "li": li});
    });
    
    reader.readAsDataURL(file);
  }
  
  function removePreview(li) {
    queue = queue.filter(function(element){
      return element.li != li;
    });
    
    li.parentNode.removeChild(li);
  }
  
})();