const authenticationService = {
  isLoggedIn: () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  },
};

export default authenticationService;
