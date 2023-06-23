import { useState, useEffect } from "react";

export function LoggedIn({ userData }) {
  return (
    <>
      <h1>Hello {userData.display_name}</h1>
      <div className='artists'>
        <button>Get Artist</button>
      </div>
      <hr />
      <div className='recommendations'>
        <button>Get recommendations</button>
      </div>
      <hr />
    </>
  );
}

export function LoggedOut() {
  function logMeIn() {
    fetch(
      "/api/log_in?" +
        new URLSearchParams({
          scopes: "user-read-private user-read-email",
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <h1>Spotify</h1>
      <h3>Hello, log yourself in here</h3>
      <div className='me'>
        <button className='logIn' onClick={logMeIn}>
          Log Me In
        </button>
      </div>
    </>
  );
}
