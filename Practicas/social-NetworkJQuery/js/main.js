//"https://ajaxclass-1ca34.firebaseio.com/11g/drinktim.json"

//--------------- NUEVO ---------------

const showComments = (event) => {
  let idToSeeMore = event.target.dataset.postIdToComment;
  repliesWrapper.each(function () {
    this.dataset.postId === idToSeeMore
      ? $(this).children().show()
      : $(this).children().hide() && $(this).children(":first").show();
  });
  //hide current showCommentButton
  $(".btn-see-more").each(function () {
    if (this.dataset.postIdToComment == idToSeeMore) {
      $(this).hide();
    }
  });
};

const deleteReply = (key) => {
  $.ajax({
    method: "DELETE",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/drinktim/posts/${key}.json`,
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

//----------- FIN NUEVO ------------
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

const addComment = (event) => {
  let id = event.target.dataset.postId;
  let replyInput;

  let replyObj = {
    author: defaultUser.name,
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

  if (validateInfo(replyObj.content)) {
    alert("Falta contenido en el comentario");
  } else {
    saveReply(replyObj);
    printReplies(getReplies());
  }
};

const printReplies = (repliesCollection) => {
  repliesWrapper.children().remove();

  for (key in repliesCollection) {
    const { author, authorId, content, date, postId, time } = repliesCollection[
      key
    ];

    let reply = `
          <li class="list-group-item">
              <div class="reply-box">
                <div class="d-flex align-items-center">
                  <img class="rounded-circle mr-2" style="height: 40px; width: 40px;" src="img/choppa.png" alt="user-img">
                  <h3 class="font-weight-bold"><span>${author}</span></h3>
                </div>
                  <p class="mt-3 font-italic" >${content}</p>
                  <small class="text-right text-muted font-italic d-flex justify-content-end">
                      <span class="date">${date}</span> 
                      -
                      <span class="time">${time}</span>   
                  </small>
              </div>
          </li>
  `;

    repliesWrapper.each(function () {
      if (this.dataset.postId == postId) {
        $(this).append(reply);
      }
    });
  }
};

const printPost = (data) => {
  postWrapper.children().remove();
  for (key in data) {
    const { author, authorId, content, date, idPost, title, url } = data[key];

    let post = `
  <div class="col-12">
      <div id=${idPost} class="card shadow-sm rounded mb-3">
         <div class="row no-gutters p-4">
           <div class="col-md-4">
             <img class="w-100" style="height: 200px;" src=${url} alt="img">
           </div>
           <div class="col-md-8 p-3">
             <div "class="card-body ">
               <h3 class="card-title font-weight-bold">${title}</h3>
               <p class="text-muted font-italic"> ${author}</p>
               <p class="card-text">${content}</p>
               <p class="card-text d-flex justify-content-end"><small class="text-muted">Created <span class="text-dark">${date}</span></small></p>
             </div>
           </div>
         </div>
         <div data-post-id=${idPost} class="replies-wrapper">
         <div data-post-id=${idPost}  class="rw">
 
        
         </div>
         <div class="reply-form p-3 mt-2">
             <form>
                 <div class="form-group d-flex">
                     <input data-reply-id=${idPost} name="reply" type="text" class="form-control" placeholder="Write a comment">
                     <button data-post-id=${idPost} type="button" class="btn btn-success btn-comment">Comment</button>
                 </div>
             </form>
         </div>
     </div>
     </div>
 </div>
         `;

    postWrapper.prepend(post);
  }
  $(".btn-comment").click(addComment);
};

printPost(getData());

let repliesWrapper = $(".rw");

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

printReplies(getReplies());

//----------- NUEVO -----------
repliesWrapper.children().hide();
repliesWrapper.each(function () {
  let btnShow = `<button data-post-id-to-comment = ${this.dataset.postId} class="btn text-muted btn-see-more">See more comments</button>`;
  $(this).children(":first").show();
  $(this).children().length !== 1
    ? $(this).children(":first").append(btnShow)
    : null;
});
$(".btn-see-more").click(showComments);

//--------- FIN NUEVO -------
