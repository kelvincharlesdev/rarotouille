export const routes = {
  login: "/",
  signupPassOne: "/signupPassOne",
  signupPassTwo: "/signupPassTwo",
  forgetPassword: "/forgetPassword",
  resetPassword: "/resetPassword",
  home: "/home",
  dishDetails: (id: string = ":id") => `/dishDetails/${id}`,
  dishesList: "/dishesList",
  profile: (id: string = ":id") => `/profile/${id}`,
  orders: (id: string = ":id") => `/orders/${id}`,
  favorites: (id: string = ":id") => `/favorites/${id}`
};
