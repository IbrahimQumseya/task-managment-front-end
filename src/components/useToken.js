// export function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   if (tokenString) {
//     const userToken = JSON.parse(tokenString);
//     return userToken?.accessToken;
//   }
// }
// export function saveToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken.accessToken));
//   console.log("userToken -   ", userToken);
//   // setToken(userToken.accessToken);
// }

import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    if (userToken) {
      return userToken;
    }
    return '';
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
}
