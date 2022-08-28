const SERVICES = {
  // user - product
  createProduct: { uri: "products/create/", method: "post" },
  deleteProduct: { uri: "products/delete/", method: "delete" }, //P:id
  updateProduct: { uri: "products/update/", method: "put" }, // P:id
  // anyone - products
  getSingleProduct: { uri: "products/", method: "get" }, //p:id
  getAllProduct: { uri: "products/", method: "get" },
  // user - user routes
  signUp: { uri: "users/auth/register", method: "post" },
  login: { uri: "users/auth/login/", method: "post" },
  logout: { uri: "users/auth/logout/", method: "get" },
  me: { uri: "users/me", method: "GET" },
  forgetPassword: { uri: "users/password/forget", method: "post" },
  resetPassword: { uri: "users/password/reset", method: "post" }, // params:token
  updatePassword: { uri: "users/password/update/", method: "post" },
  UpdateProfile: { uri: "users/profile/update", method: "post" },
  // user -wishlist
  updateWishList: { uri: "users/wishlist", method: "post" },
  removeItemFromWishList: { uri: "users/wishlist/remove", method: "post" },
  // user - reviews
  createAndUpdateReview: { uri: "reviews/", method: "post" },
  toggleLikeReview: { uri: "reviews/like", method: "post" },
  deleteReview: { uri: "reviews/", method: "delete" }, // Q:productId,id(rev)
};

export default SERVICES;
