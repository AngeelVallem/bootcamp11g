$("input[type='radio']").change((event) => {
  let forma = $(event.target).data("forma-div");

  if (forma == "cuadrado") {
    $("#container").html(
      '<div style="width: 200px; height: 200px; background-color: peru;"></div>'
    );
  } else if (forma == "rectangulo") {
    $("#container").html(
      '<div style="width: 500px; height: 200px; background-color: red;"></div>'
    );
  } else {
    $("#container").html(
      '<div class="rounded-circle" style="width: 200px; height: 200px;  background-color: yellow;"></div>'
    );
  }
});

let memesArray = [
  "https://www.eltiempo.com/files/article_multimedia/uploads/2020/02/28/5e5911fb2f6b4.jpeg",
  "https://i.pinimg.com/564x/37/10/e7/3710e7cf806895198cca1429cf67d0e1.jpg",
  "https://i1.wp.com/www.materiagris.es/wp-content/uploads/2018/10/memes-comunicacion.jpg?resize=700%2C321&ssl=1",
  "https://www.semana.com/resizer/cQTMDuwGLptTTulEkVhhxwmxo3s=/1200x675/filters:format(jpg):quality(70)//cloudfront-us-east-1.images.arcpublishing.com/semana/RPPP32IHTZGLFJ2M3P75VG3R24.jpg",
  "https://www.trecebits.com/wp-content/uploads/2020/12/meme-gafas-445x445.jpeg",
];

let catsArray = [
    "https://i.pinimg.com/originals/8c/ab/4e/8cab4e46f19b1c4ae0ed8ff6c5115e7d.jpg",
    "https://i.pinimg.com/originals/8c/ab/4e/8cab4e46f19b1c4ae0ed8ff6c5115e7d.jpg",
    "https://i.ytimg.com/vi/G-uztKmgwoM/maxresdefault.jpg",
    "data:image/jpeg;base64,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",
    "https://image.slidesharecdn.com/presentation2-121220104017-phpapp01/95/funny-cats-1-638.jpg?cb=1356000051",
    "https://i.ytimg.com/vi/G-uztKmgwoM/maxresdefault.jpg",
    "https://i.pinimg.com/originals/8c/ab/4e/8cab4e46f19b1c4ae0ed8ff6c5115e7d.jpg",
    
]

const carrousselComponent = (arr) => {
    let slider = $("#slider");

let imageIndex = 0;

slider.html(`<img  class="w-100 h-35 shadow"src=${arr[0]} alt="">`);

$("#adelante").attr("disabled", false);
$("#atras").attr("disabled", true);

$("#adelante").click(() => {
  imageIndex++;

  imageIndex == arr.length - 1
    ? $("#adelante").attr("disabled", true) &&
      slider.html(
        `<img  class="w-100 h-35 shadow"src=${arr[0 + imageIndex]} alt="">`
      )
    : slider.html(
        `<img  class="w-100 h-35 shadow"src=${arr[0 + imageIndex]} alt="">`
      );

  $("#atras").attr("disabled", false);
});

$("#atras").click(() => {
  imageIndex--;

  imageIndex == 0
    ? $("#atras").attr("disabled", true) &&
      slider.html(
        `<img  class="w-100 h-35 shadow"src=${arr[0 + imageIndex]} alt="">`
      )
    : slider.html(
        `<img  class="w-100 h-35 shadow"src=${arr[0 + imageIndex]} alt="">`
      );

  $("#adelante").attr("disabled", false);
});

}

carrousselComponent(memesArray)
