//"https://ajaxclass-1ca34.firebaseio.com/11g/drinktim.json"
let defaultUser = { name: "Israel", id: 007 };

let postWrapper = $("#post-wrapper");

const validateInfo = (data) => {
  if (data === "" || data === null || data === undefined || data == NaN) {
    return true;
  } else {
    return false;
  }
};

const setPost = () => {
  const { name, id } = defaultUser;

  let newPost = {};
  $('#new-post input[type="text"]').each(function () {
    newPost[this.name] = this.value;

    validateInfo(this.value) ? alert("campos vacios") : null;
  });
  let idPost = Date.now();

  newPost = {
    ...newPost,
    date: moment().format("DD/MMMM/YYYY"),
    author: name,
    authorId: id,
    idPost,
  };

  savePost(newPost);

  $('#new-post input[type="text"]').each(function () {
    this.value = "";
  });

  printPost(getData());
};

$("#save-post").click(setPost);

const getData = () => {
  let postsCollection;

  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/drinktim/posts.json",
    success: (response) => {
      postsCollection = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return postsCollection;
};

const getReplies = () => {
  let repliesCollection;

  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/drinktim/replies.json",
    success: (response) => {
      repliesCollection = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return repliesCollection;
};

let a = getReplies();
console.log(a);

const appendComments = (data) => {
  let newPostId = [];
  let rWrapper = document.querySelectorAll(".replies-wrapper");

  for (key in data) {
    const { postId, author, authorId, content, date, time } = data[key];

    if ("1618459481258" == postId) {
      console.log(postId);
    }
  }
};

const addComment = (event) => {
  const { name } = defaultUser;

  let id = event.target.dataset.postId;
  let replyInput;

  let replyObj = {
    author: name,
    authorId: defaultUser.id,
    time: moment().format("LTS"),
    date: moment().format("DD/MMMM/YYYY"),
    postId: id,
  };

  repliesWrapper.each(function () {
    if (id == this.dataset.postId) {
      replyInput = $(`input[data-reply-id='${id}']`);
    }
  });

  replyObj = { ...replyObj, content: replyInput.val() };
  replyInput.val("");

  saveReply(replyObj);
  let a = getReplies();

  console.log(a);
};

const printPost = (data) => {
  postWrapper.children().remove();

  for (key in data) {
    const { author, authorId, content, date, idPost, title, url } = data[key];

    let post = `<div class="col-12">
        <div id=${idPost} class="card mb-3">
           <div class="row no-gutters">
             <div class="col-md-4">
               <img class="w-100" style="height: 200px;" src=${url} alt="...">
             </div>
             <div class="col-md-8">
               <div "class="card-body">
                 <h3 class="card-title">${title}</h3>
                 <p class="text-muted"> ${author}</p>
                 <p class="card-text">${content}</p>
                 <p class="card-text"><small class="text-muted">Creado el <span class="text-dark">${date}</span></small></p>
               </div>
             </div>
           </div>
           <div data-post-id=${idPost} class="replies-wrapper">
           <div class="reply-form">
               <form action="">
                   <div class="form-group d-flex">
                       <input data-reply-id=${idPost} name="reply" type="text" class="form-control">
                       <button data-post-id=${idPost} type="button" class="btn btn-success btn-comment">Comment</button>
                   </div>
               </form>
           </div>
       </div>
   </div>
    
           `;

    postWrapper.append(post);
  }
  $(".btn-comment").click(addComment);
};

printPost(getData());

let repliesWrapper = $(".replies-wrapper");

const saveReply = (newReply) => {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/drinktim/replies.json",
    data: JSON.stringify(newReply),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const savePost = (newPost) => {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/drinktim/posts.json",
    data: JSON.stringify(newPost),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

console.log(moment().format("LTS"));
