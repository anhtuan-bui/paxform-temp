import client from "../configurations/apollo";
import { LOGIN_CLIENT } from "./graphqlQuery";

const parseJwt = (token) => {
    try {
      return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  
  const login = () => {
    client
      .mutate({ mutation: LOGIN_CLIENT })
      .then((result) =>
        localStorage.setItem("clientToken", result.data.login.authToken)
      );
  };
  
  const getToken = () => {
    const token = localStorage.getItem("clientToken");
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("clientToken");
        login();
      }
    } else {
      login();
    }
  };

  export default getToken;