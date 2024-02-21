const TOKEN_KEY = "token";

const authTokenService = {
  isUserLoggedIn: () => {
    return (
      localStorage.getItem(TOKEN_KEY) !== null ||
      sessionStorage.getItem(TOKEN_KEY) !== null
    );
  },
};

export default authTokenService;
