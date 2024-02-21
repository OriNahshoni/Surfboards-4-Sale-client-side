const TOKEN_KEY = "token";

const isLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const storeToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

const getToken = () => {
  let token = isLocalStorage();
  if (token) {
    return token;
  } else {
    return sessionStorage.getItem(TOKEN_KEY);
  }
};

export { storeToken, getToken };
