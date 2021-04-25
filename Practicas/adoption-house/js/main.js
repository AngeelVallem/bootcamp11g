//https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse.json"



$("#owners-table").click(() => {
  $(".container").load("../views/owners.html");
});

$("#add-pet").click(() => {
  $("#data-container").load("../views/addPet.html");
});

$("#add-owner").click(() => {
  $("#data-container").load("../views/addOwner.html");
});

$("#c-owner").click(() => {
  $("#change-owner").modal("show");
});

const getOwners = () => {
  let ownersCollection;

  $.ajax({
    method: "GET",
    url:
      "https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse/owners.json",
    success: (response) => {
      ownersCollection = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return ownersCollection;
};

const selectOwners = (owners) => {
  let i = 0;
  let selectOption;
  
  $(".owners").children().remove()

  for (key in owners) {
    let { avatar, idOwner, name } = owners[key];

    if (i == 0) {
      selectOption = `<option value=${idOwner} selected>${name}</option>`;
      $("#img-avatar").attr("src", avatar);
      $("#c-owner").text(name);
    } else {
      selectOption = `<option value=${idOwner}>${name}</option>`;
    }

    $(".owners").append(selectOption);
    i++;
  }
};

selectOwners(getOwners());

let currentOwner;

$('#save-owner-modal').click(()=>{
  let id = $('.owners option:selected').val()
  
let filteredUser = filteredById(id);
    const { avatar,name } = filteredUser;
    $("#c-owner").text(name);
    $('#img-avatar').attr('src', avatar)
  $('#change-owner').modal('hide')
  currentOwner = filteredUser;
})



const filteredById = id => {
  let selectedUser = Object.values(getOwners()).find(owner => owner.idOwner == id);
  return selectedUser;
}

const getPets = () => {
  let petsCollection;

  $.ajax({
    method: "GET",
    url:
      "https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse/pets.json",
    success: (response) => {
      petsCollection = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return petsCollection;
};

const printPets  = (pets) => {
    let petsContainer = $('#data-container');
 let msg = `<div class="col-12">
 <small class="text-muted mx-auto">Cambia de usuario o crea uno nuevo para empezar a adoptar</small>
 </div>`

 
    petsContainer.children().remove()

    petsContainer.append(msg)

    for ( key in pets) {
      let {petName,petImg,type,description,adopted} = pets[key]

        if(adopted == false){
          let card = `    
          <div class="col-12 col-md-4 my-3">
          <div class="card">
          <img
          style = "width: 100%; height:200px ;"
            src= ${petImg}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h2 class="card-title">${petName}</h2>
            <p class="card-text">
              ${description}
            </p>
            <h5>Tipo : <small class="text-muted">${type}</small></h5>
            <button data-pet-key=${key} class="btn btn-outline-success mt-3 btn-adop">Adoptar</button>
          </div>
        </div>
        </di>
        `
  
        petsContainer.append(card)
        }
    }
}


printPets(getPets())


const patchData = (event) => {

  let key = event.target.dataset.petKey;

  $.ajax({
    method: "PATCH",
    url: `https://collections-test-x-default-rtdb.firebaseio.com/Projects/adopHouse/pets/${key}.json`,
    data: JSON.stringify({idOwner:currentOwner.idOwner , adopted:true, owner :currentOwner.name }),
    success: () => printPets(getPets()),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
};


$('.btn-adop').each(function() {
  $(this).click(patchData)
})


let completeData = []


const createCompleteCollection = () => {

  let owners = getOwners()
  let pets = getPets()

    for( key in owners ){
        let ownerId = owners[key].idOwner

        let ownerObject = {...owners[ key ], pets : []}

        for( key in pets ){

          if( pets[ key ].idOwner === ownerId  ){
              let petsObject = pets[ key ] // esto representa el reply que sí pertenece al post
              ownerObject.pets.push( petsObject )

              //console.log( `El ${reply} si pertenece` )
          } else {
              //console.log( `El ${ reply } no pertenece `)
          }
      }
        completeData.push(ownerObject)
    }
          return completeData
}



createCompleteCollection() 



