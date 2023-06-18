import { getMe, getAuthCode, logIn } from "./authorize.js";
import {
  getUser,
  getArtist,
  placeArtist,
  getRecommendations,
} from "./spotify.js";

$(document).ready(function () {
  //global variables
  let refreshToken = localStorage.getItem("refreshToken");
  const authCode = getAuthCode();

  //if authcode in URL or refresh token in storage, try getting user data from spotify
  if (authCode || (refreshToken && refreshToken !== "null")) {
    getMe(authCode, refreshToken);
    addListeners();
  } else {
    $(".logged_out").css("display", "block");
    $(".logIn").click(function () {
      logIn();
    });
  }
});

function addListeners() {
  //adds listeners for certain elements
  $(".artists button").click(function () {
    getArtist();
  });
  $(".recommendations button").click(function () {
    getRecommendations();
  });
}
