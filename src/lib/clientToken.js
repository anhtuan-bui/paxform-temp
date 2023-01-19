import client from "../configurations/apollo";
import { LOGIN_CLIENT } from "./graphqlQuery";

const USERNAME = process.env.REACT_APP_CLIENT_USERNAME;
const PASSWORD = process.env.REACT_APP_CLIENT_PASSWORD;

const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const login = () => {
  client
    .mutate({
      mutation: LOGIN_CLIENT,
      variables: { username: USERNAME, password: PASSWORD },
    })
    .then((result) =>
      localStorage.setItem("clientToken", result.data.login.refreshToken)
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
