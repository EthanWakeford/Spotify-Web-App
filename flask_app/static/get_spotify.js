$(document).ready(function () {
  //global variables
  refreshToken = localStorage.getItem("refreshToken");
  authCode = getAuthCode();

  if (authCode || refreshToken) {
    $(".logged_in").css("display", "block");
    getMe(authCode);
  } else {
    $(".logged_out").css("display", "block");
  }
});

function addListeners() {
  //adds listeners for certain elements
  $(".artists form").on("submit", function () {
    alert("submittin");
    getArtist();
  });
}

function getAuthCode() {
  // retrives the users spotify authcode from url and returns it
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  authCode = urlParams.get("code");

  return authCode;
}

function logIn() {
  //gets authcode from spotify for OAuth, expects redirect to allow scopes then to new page
  $.ajax({
    url: "http://localhost:3000/api/log_in",
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      console.log("failed login");
      console.log(response);
    },
  });
}

function getUser() {
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

function getMe() {
  /* gets info about current user from spotify, either authcode will exist in url, or 
  refresh token will be in local storage, only one is needed for this function to work,
  authcode is only to be used once, then refresh token in the return is added to local storage
  and the used for all future requests */
  console.log(refreshToken, authCode)
  $.ajax({
    url: `http://localhost:3000/api/me`,
    method: "GET",
    data: { authCode: authCode, refreshToken: refreshToken },
    success: function (response) {
      if (refreshToken === 'null') {
        /* if refresh token does NOT exist already in local storage, add
        returned refresh token to local storage */
        refreshToken = JSON.parse(response).refresh_token;
        localStorage.setItem("refreshToken", refreshToken);
      }

      const userData = JSON.parse(JSON.parse(response).response);
      console.log("sucessful me", userData, typeof userData);
      $(".logged_in").prepend(`<h1>Welcome ${userData.display_name}</h1>`);
    },
    error: function () {
      console.log("failed me query");
    },
  });
}

function getArtist() {
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

function placeArtist(artist) {
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

  for (i of artist.genres) {
    $("#artist #genres").append(`<li>${i}</li>`);
  }

  for (i of artist.images) {
    $("#artist #images").append(`<img src=${i.url} width=200>`);
  }
}

function getRecommendations() {
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
