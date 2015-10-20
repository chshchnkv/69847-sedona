(function() {
  
  if (!("FormData" in window)) {
    return;
  }
  
  var form = document.querySelector(".review-form");
    
  var errorModal = document.querySelector("#errorModal");
    errorModal.querySelector(".button").addEventListener("click", function(event) {
    event.preventDefault();
    errorModal.classList.toggle("modal--show");
  });

  var successModal = document.querySelector("#successModal");
    successModal.querySelector(".button").addEventListener("click", function(event) {
    event.preventDefault();
    successModal.classList.toggle("modal--show");
  });
  
  var queue = [];
  
  form.querySelector("#choosePhotos").addEventListener("change", function(event) {
    var files = this.files;
    
    for (var i=0; i<files.length; i++) {
      preview(files[i]);
    }
  });
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      errorModal.classList.toggle("modal--show");
      return;
    }
    
    var data = new FormData(form);
    
    queue.forEach(function(element) {
        data.append("images", element.file);
    });
    
    request(data, "https://echo.htmlacademy.ru/adaptive", function(response) {
      console.log(response);

      successModal.classList.toggle("modal--show");
    });
  });
  
  function validateForm() {
    var emptyRequiredElements = document.querySelectorAll("input:invalid");
    return emptyRequiredElements.length == 0;
  }
  
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
  
  
  // добавление/удаление путешественника
  var travelersArea = document.querySelector(".travelers");
  var travelerTemplate = document.querySelector("#travelers-item-template").innerHTML;
  
  var travelersCountInput = document.querySelector(".review-form-fields--travelers>.spinner>input");
  
  travelersCountInput.addEventListener("change", function(event) {
    var currentTravelersCount = document.querySelectorAll(".travelers__item").length;
    var needCount = travelersCountInput.value;
    
    if (isNaN(needCount)) {
      count = 0;
    }
    
    var change = needCount - currentTravelersCount;
    if (change > 0) {
      for (var i=1; i<=change; i++) {
        addTraveler(currentTravelersCount + i)
      }
    } else if (change < 0) {
      removeTravelers(needCount);
    }
    
  });
  
  function addTraveler(id){
    var html = Mustache.render(travelerTemplate, {"id": id});
    
    var li = document.createElement("li");
    li.classList.add("travelers__item");
    li.innerHTML = html;
    
    travelersArea.appendChild(li);
  }
  
  function removeTravelers(startingId) {
    var currentTravelersCount = document.querySelectorAll(".travelers__item").length;
    
    for (var i=currentTravelersCount; i>startingId; i--) {
      var lastTraveler = travelersArea.querySelector(".travelers__item:last-child");
      travelersArea.removeChild(lastTraveler);
    }
  }
})();