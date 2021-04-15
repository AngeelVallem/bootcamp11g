let cardsRow = $("#cards-c");

$("form").hide();

$("#alert-deleted").alert("close");

const setMentor = () => {
  let newMentor = {};
  $('form input[type="text"]').each(function () {
    newMentor[this.name] = this.value;
  });

  saveData(newMentor);

  printMentors(getData());

  $('form input[type="text"]').each(function () {
    this.value = "";
  });

  $("form").hide();
  $("#show-form").show("slow");

  $("#modal-save").modal("show");
};

$("#save").click(() => setMentor());

const getData = () => {
  let mentorsCollections;
  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json",
    success: (response) => {
      mentorsCollections = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return mentorsCollections;
};

const saveEdit = (event) => {
  let key = event.target.dataset.mentorKey;

  let editMentor = {};
  $('.md-form input[type="text"]').each(function () {
    editMentor[this.name] = this.value;
  });

  putData(key, editMentor);
  $("#modal-edit").modal("hide");
  $("#modal-edited").modal("show");
  printMentors(getData());
};

const getDataByKey = (event) => {
  let key = event.target.dataset.mentorKey;
  let mentorObj;
  $("#modal-edit").modal("show");
  $.ajax({
    method: "GET",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/${key}.json`,
    success: (response) => {
      mentorObj = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

  let { name, age, phone } = mentorObj;
  let editMentor = { key };
  $('.md-form input[type="text"]').each(function () {
    if (this.name == "name") {
      this.value = name;
    } else if (this.name == "age") {
      this.value = age;
    } else {
      this.value = phone;
    }
  });

  let saveButton = $(".save-button");

  saveButton.children().remove();

  let button = `<button  data-mentor-key=${key} class="btn btn-primary" id="save-edit">Save</button>`;

  saveButton.append(button);

  $("#save-edit").click(saveEdit);

};

const deleteData = (event) => {
  let key = event.target.dataset.mentorKey;

  $.ajax({
    method: "DELETE",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/${key}.json`,
    success: (response) => response,
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  $("#modal-delete").modal("show");
  $("#alert-deleted").alert();
  printMentors(getData());
};

const printMentors = (arr) => {
  cardsRow.children().remove();

  let editIcon = '<i class="bi bi-pencil-square"></i>';

  for (key in arr) {
    let { name, age, phone } = arr[key];

    let card = `<div class="col-12 col-md-4 col-lg-3"><div class="card mb-4 shadow-sm">
    <div class="card-body">
        <div class="card-title d-flex justify-content-between w-100 align-items-center">${name} 
        <button data-mentor-key="${key}" class="btn btn-warning btn-edit">${editIcon}</button>
        </div> 
        <div class="card-text">${age}</div>
        <div class="card-text">${phone}</div>
        <button data-mentor-key="${key}" class="btn btn-outline-danger btn-delete mt-2">delete</button>
    </div> </div>`;

    cardsRow.append(card);
  }

  $(".btn-delete").click(deleteData);

  $(".btn-edit").click(getDataByKey);
};

printMentors(getData());

const saveData = (object) => {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json",
    data: JSON.stringify(object),
    success: (response) => {
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
};

const putData = (key, obj) => {
  $.ajax({
    method: "PUT",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/${key}.json`,
    data: JSON.stringify(obj),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
};

const showForm = () => {
  $("#show-form").hide();
  $("form").show("slow");
};

$("#show-form").click(showForm);

$("#hide-form").click(() => {
  $("form").hide();
  $("#show-form").show("slow");
  $('form input[type="text"]').each(function () {
    this.value = "";
  });
});



