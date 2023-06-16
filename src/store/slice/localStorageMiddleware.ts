import isTokenExpired from "../../../helper";

const localStorageMiddleware = () => (next) => (action) => {
  const token = localStorage.getItem("token");
  if (!token) {
    const currentPath = window.location.pathname;
    if (
      currentPath !== "/register" &&
      currentPath !== "/login" &&
      currentPath !== "/Home"
    ) {
      window.location.href = "/login";
    }
    return next(action);
  }

  const isTokenExpiredd = isTokenExpired(token);
  const currentPath = window.location.pathname;
  if (isTokenExpiredd) {
    console.log('isssssss','rokenn')
    if (
      currentPath !== "/login" &&
      currentPath !== "/register" &&
      currentPath !== "/Home"
    ) {
      window.location.href = "/login";
    };
    return next(action);
  }

  if (!token && currentPath=== 'Create-Todo'){
    window.location.href='/login'
  }
  return next(action);
};

export default localStorageMiddleware;
