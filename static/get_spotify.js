$(document).ready(function() {
  console.log('jquery working');
  get_user();
  get_artist();
})

function get_user() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: 'http://localhost:3000/api/user',
    method: 'GET',
    success: function(response) {
      console.log(`successful Query: response: ${response}`);
    },
    error: function() {
      console.log('failed user query');
    }
  })
}

function get_artist() {
  //queries serverside api to retrive info about spotify user

  $.ajax({
    url: 'http://localhost:3000/api/artist',
    method: 'GET',
    success: function(response) {
      const obj = JSON.parse(response);
      console.log(`successful Query artist`, obj);

      place_artist(obj);
    },
    error: function() {
      console.log('failed artist query');
    }
  })
}

function place_artist(artist) {
  $('body').append(`
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
