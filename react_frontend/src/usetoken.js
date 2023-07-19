import { useState } from "react";

export default function useToken() {
  // react hook to handle getting login info, and setting the state of current login info
  const refreshToken = localStorage.getItem("refreshToken");

  const [token, setToken] = useState(
    refreshToken && refreshToken !== "null" ? refreshToken : ""
  );

  const saveToken = (token) => {
    localStorage.setItem("refreshToken", token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token: token,
  };
}
