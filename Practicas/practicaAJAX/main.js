let table = document.getElementById("table")
let headers = ["Name","Age","Phone"]


const saveMentor = () => {
  let nameInput = document.getElementById("name").value;
  let ageInput = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;

  let newMentor = {
    name: nameInput,
    age: ageInput,
    phone: phone,
  };

  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = xhttp.responseText;

    }
  };

  xhttp.open(
    "POST",
    "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json",
    true
  );

  xhttp.send(JSON.stringify(newMentor));

  while (table.lastElementChild) {
    table.removeChild( table.lastElementChild );
}

  getMentors()

};

document.getElementById("save").addEventListener("click", () => saveMentor());


const getMentors = () => {
  let headerRow = document.createElement("tr")

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(xhttp.responseText)


              headers.forEach(el => {
                  let header =  document.createElement("th")
                  let headerName = document.createTextNode(el)
                  
                  header.appendChild(headerName)
                  headerRow.appendChild(header)

                  table.appendChild(headerRow)
                  
              })
         

              Object.values(response).forEach((el,i) => {
                  let {name,age,phone} = el

                  let mentorRow = document.createElement("tr")
                  let nameTd =  document.createElement("td")
                  let ageTd =  document.createElement("td")
                  let phoneTd =  document.createElement("td")
                  let nameTxt = document.createTextNode(name)
                  let ageTxt = document.createTextNode(age)
                  let phoneTxt = document.createTextNode(phone)
                  

                      nameTd.appendChild(nameTxt)
                      mentorRow.appendChild(nameTd)
                      table.appendChild(mentorRow)

                      ageTd.appendChild(ageTxt)
                      mentorRow.appendChild(ageTd)
                      table.appendChild(mentorRow)

                      phoneTd.appendChild(phoneTxt)
                      mentorRow.appendChild(phoneTd)
                      table.appendChild(mentorRow)
                      
                      let button = document.createElement("button");
                          button.className ="btn-delete"
                      
                              button.dataset.mentorKey = Object.keys(response)[i]

                    

                     
                      let buttonTd = document.createElement("td");
                      let buttonTxt = document.createTextNode("Eliminar");
                      
                     
                      
                  
                      button.appendChild(buttonTxt);
                      buttonTd.appendChild(button);
                      mentorRow.appendChild(buttonTd);


                             table.appendChild(mentorRow)                      
                  })
                  
                  
             
                 

                
                
                }
                
            document.querySelectorAll(".btn-delete").forEach(button =>{
                 let mentorKey = button.dataset.mentorKey
                     button.addEventListener("click",() => deleteMentor(mentorKey))
               }) 
              }
  xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json", true);
  xhttp.send();
}


getMentors()




const deleteMentor = mentorKey => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = xhttp.responseText

        }
    }

    xhttp.open("DELETE", `https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/${mentorKey}.json`, true);

    xhttp.send( );

    while (table.lastElementChild) {
      table.removeChild( table.lastElementChild );
  }
  
    getMentors()
  

}


