$(document).ready(function() {
  getUser();
  const authCode = getAuthCode();
})

function getAuthCode() {
  // retrives the users spotify authcode from session storage or url, if present in url the stores in session storage
  const authCode = sessionStorage.getItem('code');
  if (authCode) {
    return authCode;
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  console.log(urlParams.get('code'))
  return urlParams.get('code');
}

function logIn() {
  // logs the users into the spotify API, or creates a button for the user to sign in
  console.log(authCode);
  
}

function getUser() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: 'http://localhost:3000/api/users',
    method: 'GET',
    success: function(response) {
      console.log('successful user', response);
    },
    error: function() {
      console.log('failed user query');
    }
  });
}

function getMe() {
  //gets info about current user, redirects to spotify page for user to allow access to private info

  $.ajax({
    url: 'http://localhost:3000/api/me',
    method: 'GET',
    success: function(response) {
      console.log('sucessful me', response);
    },
    error: function() {
      console.log('failed me query');
    }
  });
}

function getArtist() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: 'http://localhost:3000/api/artists',
    method: 'GET',
    success: function(response) {
      const obj = JSON.parse(response.text);
      console.log(`successful Query artist`, obj);

      placeArtist(obj);
    },
    error: function(response) {
      console.log('failed artist query', response);
    }
  })
}

function placeArtist(artist) {
  $('#artist').remove();
  $('div.artists').append(`
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
</ul>`)

  for (i of artist.genres) {
    $('#artist #genres').append(`<li>${i}</li>`)
  }

  for (i of artist.images) {
    $('#artist #images').append(`<img src=${i.url} width=200>`)
  }
}

function getRecommendations() {
  $('div.recommendations').append('<p>personally I recommend this dick</p>');
  $.ajax({
    url: 'http://localhost:3000/api/recommendations',
    method: 'GET',
    success: function(response) {
      console.log(`successful Query recs`, response);
    },
    error: function(response) {
      console.log('failed recs query', response);
    }
  })
}
