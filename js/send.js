(function () {
  
  if (!("FormData" in window)) {
    return;
  }
  
  if (document.querySelectorAll(".review-form").length > 0) {
    // init 
    var checkInInput = document.querySelector("#dateCheckIn");
    var stayDaysInput = document.querySelector("#stayLength");
    var checkOutInput = document.querySelector("#dateCheckOut");
    var form = document.querySelector(".review-form");
    var errorModal = document.querySelector("#errorModal");
    var successModal = document.querySelector("#successModal");
    var travelersArea = document.querySelector(".travelers");
    var travelersCountInput = document.querySelector("#numberOfTravelers");
    var galleryArea = form.querySelector(".gallery__list");
    var photoQueue = [];


    //templates
    var template = document.querySelector("#gallery-image-template").innerHTML;
    var travelerTemplate = document.querySelector("#travelers-item-template").innerHTML;

  //  //init dates
    moment.locale("ru");
    updateCheckOutDate();

    form.querySelector("#choosePhotos").addEventListener("change", function (event) {
      var files = this.files;

      for (var i=0; i<files.length; i++) {
        preview(files[i]);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        errorModal.classList.toggle("modal--show");
        return;
      }

      var data = new FormData(form);

      photoQueue.forEach(function (element) {
          data.append("images", element.file);
      });

      request(data, "https://echo.htmlacademy.ru/adaptive", function (response) {
        console.log(response);
        successModal.classList.toggle("modal--show");
      });
    });

    function validateForm() {
      var res = false;
      var emptyRequiredElements = document.querySelectorAll("input:invalid");
      console.log(emptyRequiredElements);
      res = emptyRequiredElements.length == 0;

      if (res) {
        res = areDatesValid();
      }

      return res;
    }

    function areDatesValid() {
      return (moment(checkInInput.value, "DD.MM.YYYY").isValid() && !isNaN(stayDaysInput.value));
    }

    stayDaysInput.addEventListener("change", function () {
      updateCheckOutDate();
    });

    checkInInput.addEventListener("change", function () {
      updateCheckOutDate();
    })


    function updateCheckOutDate() {

      if (!areDatesValid()) {
        checkInInput.value = moment().format("L");
      }

      var checkInDate = moment(checkInInput.value, "DD.MM.YYYY");
      var daysStay = Number(stayDaysInput.value);
      var checkOutDate = checkInDate.add(daysStay, "days");
      checkOutInput.value = checkOutDate.format("L");
    }

    function request(data, url, callback_func) {
      var xhr = new XMLHttpRequest();
      var time = (new Date()).getTime();
      var sendUrl = url + "?" +time;

      xhr.open("post", sendUrl);
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4) {
          callback_func(xhr.responseText);
        }
      });

      xhr.send(data);
    }

    function preview(file) {
      var reader = new FileReader();
      reader.addEventListener("load", function (event) {
        var html = Mustache.render(template, {
          "image": event.target.result,
          "name": file.name
        });

        var li = document.createElement("li");
        li.classList.add("gallery__item");
        li.innerHTML = html;

        galleryArea.appendChild(li);

        li.querySelector(".gallery__remove-item-link").addEventListener("click", function (event) {
          event.preventDefault();
          removePreview(li);
        });

        photoQueue.push({"file": file, "li": li});
      });

      reader.readAsDataURL(file);
    }

    function removePreview(li) {
      photoQueue = photoQueue.filter(function (element){
        return element.li != li;
      });

      li.parentNode.removeChild(li);
    }


    // добавление/удаление путешественника  
    travelersCountInput.addEventListener("change", function (event) {
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
  }
})();