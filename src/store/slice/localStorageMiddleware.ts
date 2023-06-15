import isTokenExpired from "../../../helper";

const localStorageMiddleware = () => (next) => (action) => {
  const token = localStorage.getItem("token");
  if (!token) {
    const currentPath = window.location.pathname;
    if (currentPath !== "/register" && currentPath !== "/login" && currentPath!=='/') {
      window.location.href = "/login";
    }
    return next(action);
  }

  const isTokenExpiredd = isTokenExpired(token);
  console.log('isssssss','rokenn')
  const currentPath = window.location.pathname;
  if (isTokenExpiredd) {
    if (currentPath !== "/login" && currentPath!== '/register' && currentPath!=='/') {window.location.href = "/login"};
    return next(action);
  }

  return next(action);
};

export default localStorageMiddleware;
