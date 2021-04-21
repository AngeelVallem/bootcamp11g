let cOwner;

const printAdoptedPets  = (pets) => {
    let petsContainer = $('#adopted-pets');
    petsContainer.children().remove()

    for ( key in pets) {
      let {petName,petImg,type,description,adopted,owner} = pets[key]

        if(adopted == true){
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
            <h4>Adoptado por : <small>${owner}</small></h4>
          </div>
        </div>
        </di>
        `
  
        petsContainer.append(card)
        }
    }
}


  const filterByOwner = () => {
    let arr = getPets();
    let newObject = {};
    for ( key in arr) {
            
        let {idOwner}=  arr[key]
        
        if(currentOwner.idOwner == idOwner){
            newObject[key] = arr[key];
        }

    }
    printAdoptedPets(newObject)
    
}

printAdoptedPets(getPets())


$('#save-owner-modal').click(filterByOwner)


