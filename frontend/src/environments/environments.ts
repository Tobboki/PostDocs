export const environment = {
  production: false,
  baseUrl: `http://127.0.0.1:8000/`,
  authApiUrl: `http://127.0.0.1:8000/api/`,
  authEndpoints: {
    login: 'token/',
    refreshToken: 'token/refresh/',
    logout: 'logout/',
    isAuthenticated: 'authenticated/',
    register: 'register/',
  },
  dataEndpoints: {
    posts: 'posts/',
    users: 'users/',
    comments: 'comments/',
    photos: 'photos/',
  },
};
