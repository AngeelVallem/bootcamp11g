const setOwner = () => {
    let ownerObj = {
      idOwner: Date.now()
    };
  
    $('#owner-form input[type="text"]').each(function () {
      ownerObj[this.name] = this.value;
    });
  
  
    $('#owner-form input[type="text"]').each(function () {
      this.value = "";
    });

    saveOwner(ownerObj)
    selectOwners(getOwners());
  };
  
  $("#save-owner").click(setOwner)
  

  const saveOwner = (object) => {
    $.ajax({
      method: "POST",
      url: "https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse/owners.json",
      data: JSON.stringify(object),
      success: (response) => {
          console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  };


  
