
    var myChoices = [];

    function showRoom(roomId) {
      var roomElement = document.getElementById(roomId);
      if (myChoices.length < 3) {
        if (!myChoices.includes(roomId)) {
          roomElement.style.display = "block";
          myChoices.push(roomId);
          
        }
        else {
          roomElement.style.display = "none";
          var index = myChoices.indexOf(roomId);
          if (index > -1) {
            myChoices.splice(index, 1);
          }
        }
      }
      else if (myChoices.includes(roomId)) {
        roomElement.style.display = "none";
        var index = myChoices.indexOf(roomId);
        if (index > -1) {
          myChoices.splice(index, 1);
        }
        
      }
      localStorage.setItem("userRooms", JSON.stringify(myChoices));
      return myChoices;
    }
