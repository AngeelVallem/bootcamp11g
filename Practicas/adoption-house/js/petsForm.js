
const setPet = () => {

  let petObj = {
    idPet: Date.now(),
    type: $("#select-type").val(),
    adopted : false
  };

  $('#pet-form input[type="text"]').each(function () {
    petObj[this.name] = this.value;
  });


  $('#pet-form input[type="text"]').each(function () {
    this.value = "";
  });

  savePet(petObj)
  window.location.replace("../index.html");
};

$("#save-pet").click(() =>{
    setPet()
    // window.location.replace('../index.html');
});


const savePet = (object) => {
    $.ajax({
      method: "POST",
      url: "https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse/pets.json",
      data: JSON.stringify(object),
      success: (response) => {
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  };