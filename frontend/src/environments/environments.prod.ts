export const environment = {
  production: true,
  authApiBaseUrl: 'http://127.0.0.1:8000/',
  authEndpoints: {
    login: 'token/',
    refreshToken: 'token/refresh/',
    logout: 'logout/',
    isAuthenticated: 'authenticated/',
    register: 'register/',
  },
};