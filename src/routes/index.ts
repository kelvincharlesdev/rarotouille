export const routes = {
  login: "/",
  signupPassOne: "/signupPassOne",
  signupPassTwo: "/signupPassTwo",
  forgetPassword: "/forgetPassword",
  resetPassword: "/resetPassword",
  home: "/home",
  dishDetails: (id: string = ":id") => `/dishDetails/${id}`,
  dishesList: "/dishesList",
  profile: "/profile",
  orders:"/orders",
  favorites: "/favorites"
};
