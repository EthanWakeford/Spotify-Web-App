//functions to facilitate getting authorized with the spotify authorization
//server, and to retrieve info about user

export function getAuthCode() {
  // retrives the users spotify authcode from url and returns it
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const authCode = urlParams.get("code");

  return authCode;
}

export function logIn() {
  //gets authcode from spotify for OAuth, expects redirect to allow scopes then to new page
  $.ajax({
    url: "http://localhost:3000/api/log_in",
    method: "GET",
    data: { scopes: 'user-read-private user-read-email' },
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      console.log("failed login");
      console.log(response);
    },
  });
}

export function getMe(authCode, refreshToken) {
  /* gets info about current user from spotify, either authcode will exist in url, or 
  refresh token will be in local storage, only one is needed for this function to work,
  authcode is only to be used once, then refresh token in the return is added to local storage
  and the used for all future requests */
  console.log(refreshToken, authCode);
  $.ajax({
    url: `http://localhost:3000/api/me`,
    method: "GET",
    data: { authCode: authCode, refreshToken: refreshToken },
    success: function (response) {
      if (!refreshToken || refreshToken === "null") {
        /* if refresh token does NOT exist already in local storage, add
        returned refresh token to local storage */
        refreshToken = JSON.parse(response).refresh_token;
        localStorage.setItem("refreshToken", refreshToken);
      }

      const userData = JSON.parse(JSON.parse(response).response);
      console.log("sucessful me", userData, typeof userData);

      //opeing up logged in page
      $(".logged_in").css("display", "block");
      $(".logged_in").prepend(`<h1>Welcome ${userData.display_name}</h1>`);
    },
    error: function () {
      $(".logged_out").css("display", "block");
      alert("Log in Attempt Failed");
      console.log("failed me query");
    },
  });
}
