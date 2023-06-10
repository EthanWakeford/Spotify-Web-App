//functions that hit the spotify API for info, and then display it

export function getUser() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: "http://localhost:3000/api/users",
    method: "GET",
    success: function (response) {
      console.log("successful user", response);
    },
    error: function () {
      console.log("failed user query");
    },
  });
}

export function getArtist() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: "http://localhost:3000/api/artists",
    method: "GET",
    success: function (response) {
      const obj = JSON.parse(response.text);
      console.log(`successful Query artist`, obj);

      placeArtist(obj);
    },
    error: function (response) {
      console.log("failed artist query", response);
    },
  });
}

export function placeArtist(artist) {
  $("#artist").remove();
  $("div.artists").append(`
<ul id="artist">
  <li>${artist.name}</li>
  <li>Popularity: ${artist.popularity}</li>
  <li>Genres:
    <ul id="genres"></ul>
  </li>
  <li>Followers: ${artist.followers.total}</li>
  <li>images:
    <ul id="images"></ul>
  </li>
</ul>`);

  for (const i of artist.genres) {
    $("#artist #genres").append(`<li>${i}</li>`);
  }

  for (const i of artist.images) {
    $("#artist #images").append(`<img src=${i.url} width=200>`);
  }
}

export function getRecommendations() {
  $("div.recommendations").append("<p>personally I recommend this dick</p>");
  $.ajax({
    url: "http://localhost:3000/api/recommendations",
    method: "GET",
    success: function (response) {
      console.log(`successful Query recs`, response);
    },
    error: function (response) {
      console.log("failed recs query", response);
    },
  });
}
